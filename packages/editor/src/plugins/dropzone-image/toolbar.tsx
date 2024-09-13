import {
  PluginToolbar,
  PreviewButton,
  ToolbarSelect,
} from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import type { ImageProps } from '@editor/plugins/image'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faCog, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { ModalWithCloseButton } from '@serlo/frontend/src/components/modal-with-close-button'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { ReactNode, useState } from 'react'

import { type DropzoneImageProps } from '.'
import { BackgroundImageSettings } from './components/editor/background-image-settings'
import { cn } from '@/helper/cn'

interface DropzoneImageToolbarProps {
  id: string
  backgroundImageState?: {
    id: string | null
    state?: ImageProps['state']
  }
  children?: ReactNode
  showSettingsButton?: boolean
  onChangeImageButtonClick: () => void
  dropzoneVisibility: DropzoneImageProps['state']['dropzoneVisibility']
  previewActive: boolean
  setPreviewActive: (active: boolean) => void
}

export function DropzoneImageToolbar({
  id,
  backgroundImageState,
  showSettingsButton = false,
  onChangeImageButtonClick,
  dropzoneVisibility,
  previewActive,
  setPreviewActive,
}: DropzoneImageToolbarProps) {
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const editorStrings = useEditorStrings()
  const dropzoneStrings = editorStrings.plugins.dropzoneImage
  const imageStrings = editorStrings.plugins.image

  const pluginControls = <PluginDefaultTools pluginId={id} />
  const visibilityOptions = Object.entries(dropzoneStrings.visibilityOptions)

  if (dropzoneVisibility === undefined) return null

  return (
    <PluginToolbar
      pluginType={EditorPluginType.DropzoneImage}
      pluginSettings={
        <>
          <button
            onClick={() => setShowSettingsModal(true)}
            className={cn(`
            mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all
            hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200
          `)}
          >
            {editorStrings.edtrIo.settings} <FaIcon icon={faCog} />
          </button>
          {renderSettingsModal()}
          <PreviewButton
            previewActive={previewActive}
            setPreviewActive={setPreviewActive}
          />
          <ToolbarSelect
            tooltipText={dropzoneStrings.dropzoneVisibility}
            value={dropzoneVisibility.value}
            changeValue={(value) => dropzoneVisibility.set(value)}
            options={visibilityOptions.map(([key, val]) => ({
              text: val.charAt(0).toUpperCase() + val.slice(1),
              value: key,
            }))}
          />
        </>
      }
      pluginControls={pluginControls}
    />
  )

  function renderSettingsModal() {
    if (!showSettingsButton || !backgroundImageState) return null

    return (
      <ModalWithCloseButton
        isOpen={showSettingsModal}
        setIsOpen={(open) => {
          const isModalClosing = !open
          if (isModalClosing) setShowSettingsModal(false)
        }}
        className="top-8 max-w-xl translate-y-0 sm:top-1/3"
      >
        <h3 className="serlo-h3 mt-4">
          {editorStrings.edtrIo.settings}:{' '}
          {editorStrings.plugins.dropzoneImage.title}
        </h3>

        <div className="mx-side my-3">
          <button
            onClick={onChangeImageButtonClick}
            className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
          >
            {imageStrings.change} <FaIcon className="ml-1" icon={faSyncAlt} />
          </button>
        </div>

        <div className="mx-side mb-3">
          <BackgroundImageSettings {...backgroundImageState} />
        </div>
      </ModalWithCloseButton>
    )
  }
}
