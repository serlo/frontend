import { SaveButton } from '@editor/editor-ui/editor-toolbar/save-button'
import {
  type EditorPlugin,
  type EditorPluginProps,
  string,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { UuidType } from '@serlo/frontend/src/data-types'
import { ContentLoaders } from '@serlo/frontend/src/serlo-editor-integration/components/content-loaders/content-loaders'

import {
  entity,
  editorContent,
  serializedChild,
  entityType,
} from './common/common'
import { EntityTitleInput } from './common/entity-title-input'
import { MetadataFieldsModal } from './common/metadata-fields-modal'

export const appletTypeState = entityType(
  {
    ...entity,
    title: string(),
    content: editorContent(),
    url: serializedChild(EditorPluginType.Geogebra),
  },
  {}
)

export type AppletTypePluginState = typeof appletTypeState

export const appletTypePlugin: EditorPlugin<AppletTypePluginState> = {
  Component: AppletTypeEditor,
  state: appletTypeState,
  config: {},
}

function AppletTypeEditor(props: EditorPluginProps<AppletTypePluginState>) {
  const {
    title,
    url,
    content,
    meta_title: metaTitle,
    meta_description: metaDescription,
    id,
    revision,
    replaceOwnState,
  } = props.state

  props.state.changes

  return (
    <>
      <div className="absolute right-0 -mt-10 mr-side flex">
        <MetadataFieldsModal
          metaTitle={metaTitle}
          metaDescription={metaDescription}
        />

        <ContentLoaders
          id={id.value}
          currentRevision={revision.value}
          onSwitchRevision={replaceOwnState}
          entityType={UuidType.Applet}
        />
      </div>
      <EntityTitleInput title={title} />

      {url.render()}
      {content.render()}

      <SaveButton showSubscriptionOptions {...props.state} />
    </>
  )
}
