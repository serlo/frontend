import { EditorModal } from '@editor/editor-ui/editor-modal'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { ReactNode, useState } from 'react'

interface MultimediaToolbarProps {
  id: string
  children: ReactNode
}

export const MultimediaToolbar = ({ id, children }: MultimediaToolbarProps) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const editorStrings = useEditStrings()

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Multimedia}
      pluginSettings={
        <>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
            data-qa="plugin-multimedia-settings-button"
          >
            {editorStrings.edtrIo.settings} <FaIcon icon={faCog} />
          </button>
          <EditorModal
            isOpen={showSettingsModal}
            setIsOpen={setShowSettingsModal}
            className="top-8 max-w-xl translate-y-0 sm:top-24"
            title={`${editorStrings.edtrIo.settings}: ${editorStrings.plugins.multimedia.title}`}
            extraTitleClassName="serlo-h3 mt-4"
          >
            <div className="mx-side mb-3">{children}</div>
          </EditorModal>
        </>
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
    />
  )
}
