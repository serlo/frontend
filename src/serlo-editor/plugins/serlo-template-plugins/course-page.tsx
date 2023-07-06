import { useEffect } from 'react'

import {
  entity,
  editorContent,
  entityType,
  headerInputClasses,
} from './common/common'
import { ContentLoaders } from './helpers/content-loaders/content-loaders'
import { ToolbarMain } from './toolbar-main/toolbar-main'
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

type CoursePageTypePluginState = typeof coursePageTypeState

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

  // TODO: check if we can / should remove this now
  useEffect(() => {
    if (!['explanation', 'question', 'play'].includes(icon.value)) {
      icon.set('explanation')
    }
  }, [icon])

  const placeholder = useEditorStrings().templatePlugins.coursePage.title

  return (
    <article>
      <h1 className="serlo-h1">
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
      {props.renderIntoToolbar(
        <ContentLoaders
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
          entityType={UuidType.CoursePage}
        />
      )}
    </article>
  )
}
