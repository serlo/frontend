import {
  type EditorPlugin,
  type EditorPluginProps,
  string,
} from '@editor/plugin'
import { CourseHeader } from '@editor/plugins/course/renderer/course-header'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { editorContent, entity, entityType } from './common/common'
import { EntityTitleInput } from './common/entity-title-input'
import { MetadataFieldsModal } from './common/metadata-fields-modal'

export const courseTypeState = entityType(
  {
    ...entity,
    title: string(),
    content: editorContent(EditorPluginType.Course),
  },
  {}
)

export type CourseTypePluginState = typeof courseTypeState

export const courseTypePlugin: EditorPlugin<CourseTypePluginState> = {
  Component: CourseTypeEditor,
  state: courseTypeState,
  config: {},
}

function CourseTypeEditor(props: EditorPluginProps<CourseTypePluginState>) {
  const { title, content, meta_description: metaDescription } = props.state

  return (
    <>
      <div className="absolute right-0 -mt-10 mr-side flex">
        <MetadataFieldsModal metaDescription={metaDescription} />
      </div>
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
