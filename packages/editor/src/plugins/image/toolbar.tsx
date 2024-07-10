import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faCog, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { ModalWithCloseButton } from '@serlo/frontend/src/components/modal-with-close-button'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { Dispatch, SetStateAction } from 'react'

import type { ImageProps } from '.'
import { SettingsModalControls } from './controls/settings-modal-controls'

export const ImageToolbar = (
  props: ImageProps & {
    showSettingsButtons?: boolean
    showSettingsModal: boolean
    setShowSettingsModal: Dispatch<SetStateAction<boolean>>
    onClickChangeImage: () => void
  }
) => {
  const {
    id,
    showSettingsModal,
    setShowSettingsModal,
    showSettingsButtons = true,
    onClickChangeImage,
  } = props
  const editorStrings = useEditorStrings()
  const imageStrings = editorStrings.plugins.image

  const pluginSettings = showSettingsButtons ? (
    <>
      <button
        onClick={() => onClickChangeImage()}
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
      <ModalWithCloseButton
        isOpen={showSettingsModal}
        setIsOpen={setShowSettingsModal}
        className="top-8 max-w-xl translate-y-0 sm:top-1/3"
      >
        <h3 className="serlo-h3 mt-4">
          {editorStrings.edtrIo.settings}: {imageStrings.title}
        </h3>

        <div className="mx-side mb-3">
          <SettingsModalControls state={props.state} />
        </div>
      </ModalWithCloseButton>
    </>
  ) : undefined

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Image}
      pluginSettings={pluginSettings}
      // pluginTooltipText={editorStrings.plugins.image.helpTooltipText}
      pluginControls={<PluginDefaultTools pluginId={id} />}
    />
  )
}
