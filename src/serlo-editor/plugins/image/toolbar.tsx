import { faCog } from '@fortawesome/free-solid-svg-icons'
import { Dispatch, SetStateAction } from 'react'

import type { ImageProps } from '.'
import { SettingsModalControls } from './controls/settings-modal-controls'
import { UploadButton } from './controls/upload-button'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'

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
      pluginType={EditorPluginType.Image}
      pluginSettings={
        <>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
            data-qa="plugin-image-settings"
          >
            {editorStrings.edtrIo.settings} <FaIcon icon={faCog} />
          </button>
          {showSettingsModal ? (
            <ModalWithCloseButton
              isOpen={showSettingsModal}
              onCloseClick={() => setShowSettingsModal(false)}
              className="top-8 max-w-xl translate-y-0 sm:top-1/3"
            >
              <h3 className="serlo-h3 mt-4">
                {editorStrings.edtrIo.settings}: {imageStrings.title}
              </h3>

              <div className="mx-side mb-3">
                <SettingsModalControls state={props.state} />
              </div>
            </ModalWithCloseButton>
          ) : null}

          <UploadButton {...props} />
        </>
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
    />
  )
}
