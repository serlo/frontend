import {
  PluginToolbar,
  PreviewButton,
  ToolbarSelect,
} from '@editor/editor-ui/plugin-toolbar'
import { runChangeDocumentSaga, useAppDispatch } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faCog, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { ModalWithCloseButton } from '@serlo/frontend/src/components/modal-with-close-button'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { useCallback, useState } from 'react'

import { type DropzoneImageProps } from '.'
import { BackgroundImageSettings } from './components/editor/background-image-settings'
import { InteractiveToolbarTools } from '../exercise/toolbar/interactive-toolbar-tools'
import { cn } from '@/helper/cn'

interface DropzoneImageToolbarProps {
  id: string
  backgroundImage?: DropzoneImageProps['state']['backgroundImage']
  showSettings: boolean
  showSettingsButton?: boolean
  dropzoneVisibility?: DropzoneImageProps['state']['dropzoneVisibility']
  previewActive?: boolean
  setPreviewActive?: (active: boolean) => void
}

export function DropzoneImageToolbar({
  id,
  backgroundImage,
  showSettings,
  showSettingsButton = false,
  dropzoneVisibility,
  previewActive,
  setPreviewActive,
}: DropzoneImageToolbarProps) {
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const editorStrings = useEditorStrings()
  const dropzoneStrings = editorStrings.plugins.dropzoneImage
  const imageStrings = editorStrings.plugins.image

  const visibilityOptions = Object.entries(dropzoneStrings.visibilityOptions)

  const dispatch = useAppDispatch()

  const handleChangeImageButtonClick = useCallback(() => {
    if (!backgroundImage?.defined) return

    dispatch(
      runChangeDocumentSaga({
        id: backgroundImage.id,
        state: { initial: (curr) => ({ ...(curr as object), src: '' }) },
      })
    )
  }, [backgroundImage, dispatch])

  return (
    <PluginToolbar
      pluginType={EditorPluginType.DropzoneImage}
      pluginSettings={showSettings ? renderSettingsButtons() : undefined}
      pluginControls={<InteractiveToolbarTools id={id} />}
    />
  )

  function renderSettingsButtons() {
    if (!dropzoneVisibility && !showSettingsButton) return undefined

    return (
      <>
        {showSettingsButton ? (
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
          </>
        ) : null}
        {previewActive !== undefined && setPreviewActive !== undefined ? (
          <PreviewButton
            previewActive={previewActive}
            setPreviewActive={setPreviewActive}
          />
        ) : null}
        {dropzoneVisibility ? (
          <ToolbarSelect
            tooltipText={dropzoneStrings.dropzoneVisibility}
            value={dropzoneVisibility.value}
            changeValue={(value) => dropzoneVisibility.set(value)}
            options={visibilityOptions.map(([key, val]) => ({
              text: val.charAt(0).toUpperCase() + val.slice(1),
              value: key,
            }))}
          />
        ) : null}
      </>
    )
  }

  function renderSettingsModal() {
    if (!backgroundImage?.defined) return null

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
            onClick={handleChangeImageButtonClick}
            className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
          >
            {imageStrings.change} <FaIcon className="ml-1" icon={faSyncAlt} />
          </button>
        </div>

        <div className="mx-side mb-3">
          <BackgroundImageSettings id={backgroundImage.id} />
        </div>
      </ModalWithCloseButton>
    )
  }
}
