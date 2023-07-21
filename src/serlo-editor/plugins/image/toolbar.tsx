import { faCog } from '@fortawesome/free-solid-svg-icons'
import { Dispatch, SetStateAction } from 'react'

import { ImageProps } from '.'
import { SettingsControls } from './controls'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { DefaultControls } from '@/serlo-editor/editor-ui/plugin-toolbar/dropdown/default-controls'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export const ImageToolbar = (
  props: ImageProps & {
    showSettingsModal: boolean
    setShowSettingsModal: Dispatch<SetStateAction<boolean>>
  }
) => {
  const { id, showSettingsModal, setShowSettingsModal } = props
  const editorStrings = useEditorStrings()
  const imageStrings = editorStrings.plugins.image

  return (
    <PluginToolbar
      pluginId={id}
      pluginType={EditorPluginType.Image}
      contentControls={<div className="toolbar-controls-target" />}
      pluginSettings={
        <>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
          >
            {editorStrings.edtrIo.settings} <FaIcon icon={faCog} />
          </button>
          {showSettingsModal ? (
            <ModalWithCloseButton
              isOpen={showSettingsModal}
              onCloseClick={() => setShowSettingsModal(false)}
              className="!top-[10%] !max-w-xl"
            >
              <h3 className="serlo-h3 mt-4">
                {editorStrings.edtrIo.settings}: {imageStrings.title}
              </h3>

              <div className="mx-side mb-3">
                <SettingsControls {...props} />
              </div>
            </ModalWithCloseButton>
          ) : null}
        </>
      }
      pluginControls={<DefaultControls pluginId={id} />}
    />
  )
}
