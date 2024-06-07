import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { ModalWithCloseButton } from '@serlo/frontend/src/components/modal-with-close-button'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { Dispatch, SetStateAction } from 'react'

import type { ImageProps } from '.'
import { SettingsModalControls } from './controls/settings-modal-controls'
import { UploadButton } from './controls/upload-button'

export const ImageToolbar = (
  props: ImageProps & {
    showSettingsModal: boolean
    setShowSettingsModal: Dispatch<SetStateAction<boolean>>
  }
) => {
  const { id, showSettingsModal, setShowSettingsModal } = props
  const disableFileUpload = props.config.disableFileUpload // HACK: Temporary solution to make image plugin available in Moodle & Chancenwerk integration with file upload disabled.
  const editorStrings = useEditorStrings()
  const imageStrings = editorStrings.plugins.image

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Image}
      pluginSettings={
        <>
          <ModalWithCloseButton
            // {/* isOpen={showSettingsModal} */}
            trigger={
              <button
                // onClick={() => setShowSettingsModal(true)}
                className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
                data-qa="plugin-image-settings"
              >
                {editorStrings.edtrIo.settings} <FaIcon icon={faCog} />
              </button>
            }
            // onCloseClick={() => setShowSettingsModal(false)}
            className="top-8 max-w-xl translate-y-0 sm:top-1/3"
          >
            <h3 className="serlo-h3 mt-4">
              {editorStrings.edtrIo.settings}: {imageStrings.title}
            </h3>

            <div className="mx-side mb-3">
              <SettingsModalControls state={props.state} />
            </div>
          </ModalWithCloseButton>

          {disableFileUpload ? null : <UploadButton {...props} />}
        </>
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
    />
  )
}
