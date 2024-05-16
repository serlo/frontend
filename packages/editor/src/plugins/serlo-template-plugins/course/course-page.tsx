import {
  type EditorPlugin,
  type EditorPluginProps,
  string,
} from '@editor/plugin'
import { useEffect } from 'react'

import { entity, editorContent, entityType } from '../common/common'
import { EntityTitleInput } from '../common/entity-title-input'
import { ToolbarMain } from '../toolbar-main/toolbar-main'

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

  return (
    <>
      <article>
        <EntityTitleInput title={title} forceFocus />

        {content.render()}

        {props.config.skipControls ? null : (
          <ToolbarMain showSubscriptionOptions {...props.state} />
        )}
      </article>
    </>
  )
}
