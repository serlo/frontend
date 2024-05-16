import {
  type EditorPlugin,
  type EditorPluginProps,
  string,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { ModalWithCloseButton } from '@serlo/frontend/src/components/modal-with-close-button'
import { UuidType } from '@serlo/frontend/src/data-types'
import { ContentLoaders } from '@serlo/frontend/src/serlo-editor-integration/components/content-loaders/content-loaders'
import { useState } from 'react'

import { editorContent, entity, entityType } from './common/common'
import { EntityTitleInput } from './common/entity-title-input'
import { MetadataFields } from './common/metadata-fields'
import { ToolbarMain } from './toolbar-main/toolbar-main'

export const articleTypeState = entityType(
  {
    ...entity,
    title: string(),
    content: editorContent(EditorPluginType.Article),
  },
  {}
)

export type ArticleTypePluginState = typeof articleTypeState

export const articleTypePlugin: EditorPlugin<ArticleTypePluginState> = {
  Component: ArticleTypeEditor,
  state: articleTypeState,
  config: {},
}

function ArticleTypeEditor(props: EditorPluginProps<ArticleTypePluginState>) {
  const {
    title,
    content,
    meta_title: metaTitle,
    meta_description: metaDescription,
  } = props.state
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  return (
    <>
      <div className="absolute right-0 -mt-10 mr-side flex">
        <button
          onClick={() => setShowSettingsModal(true)}
          className="serlo-button-editor-secondary mr-2 text-base"
        >
          Metadata <FaIcon icon={faPencilAlt} />
        </button>
        <ContentLoaders
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
          entityType={UuidType.Article}
        />
      </div>
      <EntityTitleInput title={title} forceFocus />

      <section itemProp="articleBody">{content.render()}</section>

      <ToolbarMain showSubscriptionOptions {...props.state} />
      <ModalWithCloseButton
        isOpen={showSettingsModal}
        onCloseClick={() => setShowSettingsModal(false)}
        className="top-8 max-w-xl translate-y-0 sm:top-1/3"
      >
        <MetadataFields
          metaTitle={metaTitle}
          metaDescription={metaDescription}
        />
      </ModalWithCloseButton>
    </>
  )
}
