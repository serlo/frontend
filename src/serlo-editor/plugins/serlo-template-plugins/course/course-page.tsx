import { useEffect } from 'react'

import {
  entity,
  editorContent,
  entityType,
  headerInputClasses,
} from '../common/common'
import { ContentLoaders } from '../helpers/content-loaders/content-loaders'
import { ToolbarMain } from '../toolbar-main/toolbar-main'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { UuidType } from '@/data-types'
import { EditorPlugin, EditorPluginProps, string } from '@/serlo-editor/plugin'

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

  useEffect(() => {
    // setting not used any more, reset to explanation for now
    if (icon.value !== 'explanation') icon.set('explanation')
  })

  const placeholder = useEditorStrings().templatePlugins.coursePage.title

  return (
    <article>
      <div className="absolute right-0 -mt-10 mr-side flex">
        <ContentLoaders
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
          entityType={UuidType.CoursePage}
        />
      </div>
      <h1 className="serlo-h1 mt-20">
        {props.editable ? (
          <input
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
  )
}
