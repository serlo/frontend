import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { Dispatch, SetStateAction } from 'react'

import type { AudioProps } from '.'
import { EditorInput } from '../../editor-ui'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export const AudioToolbar = ({
  id,
  state,
  autofocusRef,
  showSettingsModal,
  setShowSettingsModal,
}: AudioProps & {
  showSettingsModal: boolean
  setShowSettingsModal: Dispatch<SetStateAction<boolean>>
}) => {
  const audioStrings = useEditorStrings().plugins.audio

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Audio}
      pluginSettings={
        <>
          {/* We are not showing the button to edit the audio URL if it's a base64 file */}
          {!state.base64AudioRecording.value && (
            <button
              onClick={() => setShowSettingsModal(true)}
              className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
            >
              {audioStrings.audioUrl} <FaIcon icon={faPencilAlt} />
            </button>
          )}
          {/* In the future we want a popovers per setting, but this is faster for now */}
          {showSettingsModal ? (
            <ModalWithCloseButton
              isOpen={showSettingsModal}
              onCloseClick={() => setShowSettingsModal(false)}
              className="!top-1/3 !max-w-xl"
            >
              <h3 className="serlo-h3 mt-4">{audioStrings.title}</h3>

              <div className="mx-side mb-3">
                <EditorInput
                  label={`${audioStrings.audioUrl}: `}
                  value={state.src.value}
                  onChange={(e) => {
                    // as there can only be an external src/url or recording, we
                    // are resetting the file (right now base64) upon the user
                    // providing a url
                    state.base64AudioRecording.set('')
                    state.src.set(e.target.value)
                  }}
                  inputWidth="100%"
                  width="100%"
                  placeholder="voca.ro/audio-id"
                  ref={autofocusRef}
                  className="block"
                />
              </div>
            </ModalWithCloseButton>
          ) : null}
        </>
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
    />
  )
}
