import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import type { ImageProps } from '@editor/plugins/image'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { ModalWithCloseButton } from '@serlo/frontend/src/components/modal-with-close-button'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { ReactNode, useState } from 'react'

import { BackgroundImageSettings } from './components/editor/background-image-settings'

interface DragDropBgToolbarProps {
  id: string
  backgroundImageState: {
    id: string | null
    state?: ImageProps['state']
  }
  children?: ReactNode
  onClickAddAnswerZone?: () => void
  showSettingsButton?: boolean
}

export const DragDropBgToolbar = (props: DragDropBgToolbarProps) => {
  const {
    id,
    backgroundImageState,
    onClickAddAnswerZone,
    showSettingsButton = false,
    children,
  } = props

  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const editorStrings = useEditorStrings()

  const pluginControls = <PluginDefaultTools pluginId={id} />

  const addButton = onClickAddAnswerZone ? (
    <button
      data-qa="plugin-drag-drop-bg-add-answer-zone-button"
      onClick={onClickAddAnswerZone}
      className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
    >
      Ablagezone
    </button>
  ) : (
    <></>
  )

  return (
    <PluginToolbar
      pluginType={EditorPluginType.DragDropBg}
      contentControls={addButton}
      pluginSettings={
        <>
          {showSettingsButton && (
            <button
              onClick={() => setShowSettingsModal(true)}
              className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
            >
              {editorStrings.edtrIo.settings} <FaIcon icon={faCog} />
            </button>
          )}
          <ModalWithCloseButton
            isOpen={showSettingsModal}
            onCloseClick={() => setShowSettingsModal(false)}
            className="top-8 max-w-xl translate-y-0 sm:top-1/3"
          >
            <h3 className="serlo-h3 mt-4">
              {editorStrings.edtrIo.settings}:{' '}
              {editorStrings.plugins.dragDropBg.title}
            </h3>

            <div className="mx-side mb-3">
              <BackgroundImageSettings {...backgroundImageState} />
            </div>
          </ModalWithCloseButton>
          {children}
        </>
      }
      pluginControls={pluginControls}
    />
  )
}
