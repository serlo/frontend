import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import {
  editorContent,
  entity,
  entityType,
  headerInputClasses,
} from './common/common'
import { ContentLoaders } from './helpers/content-loaders/content-loaders'
import { SettingsTextarea } from './helpers/settings-textarea'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { UuidType } from '@/data-types'
import {
  type EditorPlugin,
  type EditorPluginProps,
  string,
} from '@/serlo-editor/plugin'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export const articleTypeState = entityType(
  {
    ...entity,
    title: string(),
    content: editorContent(EditorPluginType.Article),
    meta_title: string(),
    meta_description: string(),
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
  const { title, content, meta_title, meta_description } = props.state
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const articleStrings = useEditorStrings().templatePlugins.article

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
      <h1 className="serlo-h1 mt-20" itemProp="name">
        {props.editable ? (
          <input
            className={headerInputClasses}
            placeholder={articleStrings.title}
            value={title.value}
            onChange={(e) => title.set(e.target.value)}
          />
        ) : (
          title.value
        )}
      </h1>

      <section itemProp="articleBody">{content.render()}</section>

      <ToolbarMain showSubscriptionOptions {...props.state} />
      {showSettingsModal ? (
        <ModalWithCloseButton
          isOpen={showSettingsModal}
          onCloseClick={() => setShowSettingsModal(false)}
          className="!top-1/3 !max-w-xl"
        >
          <div className="mx-side mb-3 mt-12">
            <SettingsTextarea
              label={articleStrings.seoTitle}
              state={meta_title}
            />
            <SettingsTextarea
              label={articleStrings.seoDesc}
              state={meta_description}
            />
          </div>
        </ModalWithCloseButton>
      ) : null}
    </>
  )
}
