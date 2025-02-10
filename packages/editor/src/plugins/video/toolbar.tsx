import { EditorModal } from '@editor/editor-ui/editor-modal'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { isTempFile } from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faPencilAlt, faSyncAlt } from '@fortawesome/free-solid-svg-icons'

import type { VideoProps } from '.'
import { EditorInput } from '../../editor-ui'

export const VideoToolbar = ({
  id,
  state,
  showSettingsButtons,
  showSettingsModal,
  setShowSettingsModal,
  onChangeVideoButtonClick,
}: VideoProps & {
  showSettingsButtons: boolean
  showSettingsModal: boolean
  setShowSettingsModal: (show: boolean) => void
  onChangeVideoButtonClick: () => void
}) => {
  const videoStrings = useEditStrings().plugins.video

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Video}
      pluginSettings={showSettingsButtons ? renderPluginSettings() : undefined}
      pluginControls={<PluginDefaultTools pluginId={id} />}
    />
  )

  function renderPluginSettings() {
    return (
      <>
        <button
          onClick={onChangeVideoButtonClick}
          className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
        >
          {videoStrings.change} <FaIcon className="ml-1" icon={faSyncAlt} />
        </button>
        <button
          onClick={() => setShowSettingsModal(true)}
          className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
        >
          {videoStrings.settings} <FaIcon icon={faPencilAlt} />
        </button>
        <EditorModal
          isOpen={showSettingsModal}
          setIsOpen={(open) => {
            if (!open) setShowSettingsModal(false)
          }}
          className="top-8 max-w-xl translate-y-0 sm:top-24"
          title={videoStrings.title}
          extraTitleClassName="serlo-h3 mt-4"
        >
          <div className="mx-side mb-3">
            <EditorInput
              autoFocus={showSettingsModal}
              label={`${videoStrings.videoUrl}: `}
              value={isTempFile(state.src.value) ? '' : state.src.value}
              onChange={(e) => {
                state.src.set(e.target.value)
              }}
              inputWidth="100%"
              width="100%"
              placeholder="(YouTube, Vimeo)"
              className="block"
            />
          </div>
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
        </EditorModal>
      </>
    )
  }
}
