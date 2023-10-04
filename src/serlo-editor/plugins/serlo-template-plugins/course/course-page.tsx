import { useEffect, useRef } from 'react'

import {
  entity,
  editorContent,
  entityType,
  headerInputClasses,
} from '../common/common'
import { ToolbarMain } from '../toolbar-main/toolbar-main'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import {
  type EditorPlugin,
  type EditorPluginProps,
  string,
} from '@/serlo-editor/plugin'
import { focus, useAppDispatch } from '@/serlo-editor/store'

export const coursePageTypeState = entityType(
  {
    ...entity,
    title: string(''),
    icon: string('explanation'),
    content: editorContent(),
  },
  {}
)

export type CoursePageTypePluginState = typeof coursePageTypeState

export const coursePageTypePlugin: EditorPlugin<
  CoursePageTypePluginState,
  { skipControls: boolean }
> = {
  Component: CoursePageTypeEditor,
  state: coursePageTypeState,
  config: { skipControls: false },
}

function CoursePageTypeEditor(
  props: EditorPluginProps<CoursePageTypePluginState, { skipControls: boolean }>
) {
  const { title, content, icon } = props.state
  const titleRef = useRef<HTMLInputElement>(null)

  const dispatch = useAppDispatch()

  useEffect(() => {
    // setting not used any more, reset to explanation for now
    if (icon.value !== 'explanation') icon.set('explanation')
  })

  useEffect(() => {
    if (props.editable) {
      // focus on title, remove focus from content
      setTimeout(() => {
        dispatch(focus(null))
        titleRef.current?.focus()
      })
    }
    // only after creating plugin
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const placeholder = useEditorStrings().templatePlugins.coursePage.title

  return (
    <>
      <article>
        <h1 className="serlo-h1 mt-12">
          {props.editable ? (
            <input
              ref={titleRef}
              autoFocus
              className={headerInputClasses}
              placeholder={placeholder}
              value={title.value}
              onChange={(e) => title.set(e.target.value)}
            />
          ) : (
            <span itemProp="name">{title.value}</span>
          )}
        </h1>

        {content.render()}

        {props.config.skipControls ? null : (
          <ToolbarMain showSubscriptionOptions {...props.state} />
        )}
      </article>
    </>
  )
}
