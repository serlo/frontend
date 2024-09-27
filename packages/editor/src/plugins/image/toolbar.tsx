import { EditorModal } from '@editor/editor-ui/editor-modal'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEditorStrings } from '@editor/utils/use-editor-strings'
import { faCog, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import type { ImageProps } from '.'
import { SettingsModalControls } from './controls/settings-modal-controls'

interface ImageToolbarProps {
  id: ImageProps['id']
  state: ImageProps['state']
  title: string | undefined
  showSettingsButtons: boolean
  onChangeImageButtonClick: () => void
}

export function ImageToolbar({
  id,
  state,
  title,
  showSettingsButtons,
  onChangeImageButtonClick,
}: ImageToolbarProps) {
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  const editorStrings = useEditorStrings()
  const imageStrings = editorStrings.plugins.image

  const pluginSettings = showSettingsButtons ? (
    <>
      <button
        onClick={onChangeImageButtonClick}
        className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
      >
        {imageStrings.change} <FaIcon className="ml-1" icon={faSyncAlt} />
      </button>
      <button
        onClick={() => setShowSettingsModal(true)}
        className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
        data-qa="plugin-image-settings"
      >
        {editorStrings.edtrIo.settings} <FaIcon className="ml-1" icon={faCog} />
      </button>
      <EditorModal
        isOpen={showSettingsModal}
        setIsOpen={setShowSettingsModal}
        className="top-8 max-w-xl translate-y-0 sm:top-24"
        title={`${editorStrings.edtrIo.settings}: ${imageStrings.title}`}
        extraTitleClassName="serlo-h3 mt-4"
      >
        <div className="mx-side mb-3">
          <SettingsModalControls state={state} />
        </div>
      </EditorModal>
    </>
  ) : undefined

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Image}
      pluginSettings={pluginSettings}
      pluginControls={<PluginDefaultTools pluginId={id} />}
      pluginTitle={title}
      noWhiteShadow
    />
  )
}
