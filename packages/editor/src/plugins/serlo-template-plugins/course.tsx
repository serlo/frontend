import {
  child,
  type EditorPlugin,
  type EditorPluginProps,
  object,
  string,
} from '@editor/plugin'
import { CourseHeader } from '@editor/plugins/course/renderer/course-header'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { EntityTitleInput } from './common/entity-title-input'

export const courseTypeState = object({
  title: string(),
  content: child({ plugin: EditorPluginType.Course }),
})

export type CourseTypePluginState = typeof courseTypeState

export const courseTypePlugin: EditorPlugin<CourseTypePluginState> = {
  Component: CourseTypeEditor,
  state: courseTypeState,
}

function CourseTypeEditor(props: EditorPluginProps<CourseTypePluginState>) {
  const { title, content } = props.state

  return (
    <>
      <article className="mt-20">
        <CourseHeader
          title={
            <EntityTitleInput
              title={title}
              compact
              className="!mt-1 -ml-2 rounded-xl !border-2 !border-solid border-transparent bg-editor-primary-100 px-2 focus:border-editor-primary"
            />
          }
        />
        {content.render()}
      </article>
    </>
  )
}
