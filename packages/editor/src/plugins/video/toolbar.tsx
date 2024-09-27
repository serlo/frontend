import { EditorModal } from '@editor/editor-ui/editor-modal'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEditorStrings } from '@editor/utils/use-editor-strings'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { Dispatch, SetStateAction } from 'react'

import type { VideoProps } from '.'
import type { SettingsModalState } from './editor'
import { EditorInput } from '../../editor-ui'

export const VideoToolbar = ({
  id,
  state,
  showSettingsModal,
  setShowSettingsModal,
}: VideoProps & {
  showSettingsModal: SettingsModalState
  setShowSettingsModal: Dispatch<SetStateAction<SettingsModalState>>
}) => {
  const videoStrings = useEditorStrings().plugins.video

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Video}
      pluginSettings={
        <>
          <button
            onClick={() => setShowSettingsModal('url')}
            className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
          >
            {videoStrings.videoUrl} <FaIcon icon={faPencilAlt} />
          </button>
          <button
            onClick={() => setShowSettingsModal('description')}
            className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
          >
            {videoStrings.videoDescription} <FaIcon icon={faPencilAlt} />
          </button>
          <EditorModal
            isOpen={!!showSettingsModal}
            setIsOpen={(open) => {
              if (!open) setShowSettingsModal(false)
            }}
            className="top-8 max-w-xl translate-y-0 sm:top-24"
            title={videoStrings.title}
            extraTitleClassName="serlo-h3 mt-4"
          >
            <div className="mx-side mb-3">
              <EditorInput
                autoFocus={showSettingsModal === 'url'}
                label={`${videoStrings.videoUrl}: `}
                value={state.src.value}
                onChange={(e) => {
                  state.src.set(e.target.value)
                }}
                inputWidth="100%"
                width="100%"
                placeholder="(YouTube, Wikimedia Commons, Vimeo)"
                className="block"
              />
            </div>
            <div className="mx-side mb-3">
              <EditorInput
                autoFocus={showSettingsModal === 'description'}
                label={`${videoStrings.videoDescription}: `}
                value={state.alt.value}
                onChange={(e) => state.alt.set(e.target.value)}
                width="100%"
                inputWidth="100%"
                className="block"
              />
            </div>
          </EditorModal>
        </>
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
    />
  )
}
