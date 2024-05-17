import {
  type EditorPlugin,
  type EditorPluginProps,
  string,
} from '@editor/plugin'
import { CourseHeader } from '@editor/plugins/course/renderer/course-header'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { editorContent, entity, entityType } from '../common/common'
import { EntityTitleInput } from '../common/entity-title-input'
import { MetadataFieldsModal } from '../common/metadata-fields-modal'
import { ToolbarMain } from '../toolbar-main/toolbar-main'
import { UuidType } from '@/data-types'
import { ContentLoaders } from '@/serlo-editor-integration/components/content-loaders/content-loaders'

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

  // useEffect(() => {
  //   const hashId = parseInt(window.location.hash.substring(1))
  //   if (!hashId) return
  //   const index = staticPages.findIndex(({ id }) => id === hashId)
  //   setActivePageIndex(Math.max(index, 0))
  // }, [staticPages])

  // if (!staticPages) return null

  return (
    <>
      <div className="absolute right-0 -mt-10 mr-side flex">
        <MetadataFieldsModal metaDescription={metaDescription} />

        {/* <RevisionHistoryLoader
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
        /> */}
        <ContentLoaders
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
          entityType={UuidType.Course}
        />
      </div>
      <article className="mt-20">
        <CourseHeader
          title={
            <EntityTitleInput
              title={title}
              compact
              className="!mt-1 -ml-2 max-w-xl rounded-xl !border-2 !border-solid border-transparent bg-editor-primary-100 px-2 focus:border-editor-primary"
            />
          }
        />
        {content.render()}

        <ToolbarMain showSubscriptionOptions {...props.state} />
      </article>
    </>
  )
}
