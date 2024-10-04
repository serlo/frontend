import { EditorModal } from '@editor/editor-ui/editor-modal'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { ToolbarSelect } from '@editor/editor-ui/plugin-toolbar'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { runChangeDocumentSaga, useAppDispatch } from '@editor/store'
import { cn } from '@editor/utils/cn'
import { faCog, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useState } from 'react'

import { type DropzoneImageProps } from '.'
import { BackgroundImageSettings } from './components/editor/background-image-settings'
import { InteractiveToolbarPortal } from '../exercise/toolbar/interactive-toolbar-portal'

interface DropzoneImageToolbarProps {
  backgroundImage?: DropzoneImageProps['state']['backgroundImage']
  showSettings: boolean
  showSettingsButton?: boolean
  dropzoneVisibility?: DropzoneImageProps['state']['dropzoneVisibility']
  containerRef?: React.RefObject<HTMLDivElement>
}

export function DropzoneImageToolbar({
  backgroundImage,
  showSettings,
  showSettingsButton = false,
  dropzoneVisibility,
  containerRef,
}: DropzoneImageToolbarProps) {
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const editorStrings = useEditStrings()
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

  return showSettings ? (
    <InteractiveToolbarPortal containerRef={containerRef}>
      {renderSettingsButtons()}
    </InteractiveToolbarPortal>
  ) : null

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
      <EditorModal
        isOpen={showSettingsModal}
        setIsOpen={(open) => {
          const isModalClosing = !open
          if (isModalClosing) setShowSettingsModal(false)
        }}
        title={`${editorStrings.edtrIo.settings}: ${editorStrings.plugins.dropzoneImage.title}`}
        extraTitleClassName="serlo-h3 mt-4"
        className="top-8 max-w-xl translate-y-0 sm:top-20"
      >
        <div className="mx-side my-3">
          <BackgroundImageSettings id={backgroundImage.id} />
        </div>
        <div className="mx-side my-3">
          <button
            onClick={handleChangeImageButtonClick}
            className="serlo-button-editor-primary mr-2 mt-6"
          >
            {imageStrings.change} <FaIcon className="ml-1" icon={faSyncAlt} />
          </button>
        </div>
      </EditorModal>
    )
  }
}
