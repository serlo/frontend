import {
  type EditorPlugin,
  type EditorPluginProps,
  string,
} from '@editor/plugin'
import { useAppDispatch, focus } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { ModalWithCloseButton } from '@serlo/frontend/src/components/modal-with-close-button'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { UuidType } from '@serlo/frontend/src/data-types'
import { ContentLoaders } from '@serlo/frontend/src/serlo-editor-integration/components/content-loaders/content-loaders'
import { useEffect, useRef, useState } from 'react'

import {
  editorContent,
  entity,
  entityType,
  headerInputClasses,
} from './common/common'
import { SettingsTextarea } from './helpers/settings-textarea'
import { ToolbarMain } from './toolbar-main/toolbar-main'

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
  const titleRef = useRef<HTMLInputElement>(null)

  const dispatch = useAppDispatch()

  useEffect(() => {
    // focus on title, remove focus from content
    setTimeout(() => {
      dispatch(focus(null))
      titleRef.current?.focus()
    })
    // only after creating plugin
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <input
          ref={titleRef}
          className={headerInputClasses}
          placeholder={articleStrings.title}
          value={title.value}
          onChange={(e) => title.set(e.target.value)}
        />
      </h1>

      <section itemProp="articleBody">{content.render()}</section>

      <ToolbarMain showSubscriptionOptions {...props.state} />
      <ModalWithCloseButton
        isOpen={showSettingsModal}
        onCloseClick={() => setShowSettingsModal(false)}
        className="top-8 max-w-xl translate-y-0 sm:top-1/3"
      >
        <div className="mx-side mb-3 mt-12">
          <SettingsTextarea
            label={articleStrings.seoTitle}
            state={meta_title}
            autoFocus
          />
          <SettingsTextarea
            label={articleStrings.seoDesc}
            state={meta_description}
          />
        </div>
      </ModalWithCloseButton>
    </>
  )
}
