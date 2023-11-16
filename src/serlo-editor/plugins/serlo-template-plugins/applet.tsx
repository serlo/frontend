import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import {
  entity,
  editorContent,
  serializedChild,
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

export const appletTypeState = entityType(
  {
    ...entity,
    title: string(),
    content: editorContent(),
    meta_title: string(),
    meta_description: string(),
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
    meta_title,
    meta_description,
    id,
    revision,
    replaceOwnState,
  } = props.state
  const appletStrings = useEditorStrings().templatePlugins.applet
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
          id={id.value}
          currentRevision={revision.value}
          onSwitchRevision={replaceOwnState}
          entityType={UuidType.Applet}
        />
      </div>
      <h1 className="serlo-h1 mt-20">
        <input
          autoFocus
          className={headerInputClasses}
          placeholder={appletStrings.placeholder}
          value={title.value}
          onChange={(e) => title.set(e.target.value)}
        />
      </h1>

      {url.render()}
      {content.render()}

      <ToolbarMain showSubscriptionOptions {...props.state} />
      {showSettingsModal ? (
        <ModalWithCloseButton
          isOpen={showSettingsModal}
          onCloseClick={() => setShowSettingsModal(false)}
          className="!top-1/3 !max-w-xl"
        >
          <div className="mx-side mb-3 mt-12">
            <SettingsTextarea
              autoFocus
              label={appletStrings.seoTitle}
              state={meta_title}
            />
            <SettingsTextarea
              label={appletStrings.seoDesc}
              state={meta_description}
            />
          </div>
        </ModalWithCloseButton>
      ) : null}
    </>
  )
}
