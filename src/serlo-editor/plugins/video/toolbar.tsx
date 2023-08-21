import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { Dispatch, SetStateAction } from 'react'

import type { VideoProps } from '.'
import { EditorInput } from '../../editor-ui'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export const VideoToolbar = ({
  id,
  state,
  autofocusRef,
  showSettingsModal,
  setShowSettingsModal,
}: VideoProps & {
  showSettingsModal: boolean
  setShowSettingsModal: Dispatch<SetStateAction<boolean>>
}) => {
  const videoStrings = useEditorStrings().plugins.video

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Video}
      pluginSettings={
        <>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
          >
            {videoStrings.videoUrl} <FaIcon icon={faPencilAlt} />
          </button>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
          >
            {videoStrings.videoDescription} <FaIcon icon={faPencilAlt} />
          </button>
          {/* In the future we want a popovers per setting, but this is faster for now */}
          {showSettingsModal ? (
            <ModalWithCloseButton
              isOpen={showSettingsModal}
              onCloseClick={() => setShowSettingsModal(false)}
              className="!top-1/3 !max-w-xl"
            >
              <h3 className="serlo-h3 mt-4">{videoStrings.title}</h3>

              <div className="mx-side mb-3">
                <EditorInput
                  label={`${videoStrings.videoDescription}: `}
                  value={state.alt.value}
                  onChange={(e) => state.alt.set(e.target.value)}
                  width="100%"
                  inputWidth="100%"
                  className="block"
                />
              </div>
              <div className="mx-side mb-3">
                <EditorInput
                  label={`${videoStrings.videoUrl}: `}
                  value={state.src.value}
                  onChange={(e) => {
                    state.src.set(e.target.value)
                  }}
                  inputWidth="100%"
                  width="100%"
                  placeholder="(YouTube, Wikimedia Commons, Vimeo)"
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
