import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import type { ImageProps } from '@editor/plugins/image'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { ModalWithCloseButton } from '@serlo/frontend/src/components/modal-with-close-button'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { ReactNode, useState } from 'react'

import { BackgroundImageSettings } from './components/editor/background-image-settings'
import { InteractiveToolbarTools } from '../exercise/toolbar/interactive-toolbar-tools'
import { cn } from '@/helper/cn'

interface DropzoneImageToolbarProps {
  id: string
  backgroundImageState?: {
    id: string | null
    state?: ImageProps['state']
  }
  children?: ReactNode
  showSettingsButton?: boolean
}

export const DropzoneImageToolbar = (props: DropzoneImageToolbarProps) => {
  const {
    id,
    backgroundImageState,
    showSettingsButton = false,
    children,
  } = props

  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const editorStrings = useEditorStrings()

  return (
    <PluginToolbar
      pluginType={EditorPluginType.DropzoneImage}
      pluginSettings={
        <>
          {renderSettingsModal()}
          {children}
        </>
      }
      pluginControls={<InteractiveToolbarTools id={id} />}
    />
  )

  function renderSettingsModal() {
    if (!showSettingsButton || !backgroundImageState) return null

    return (
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

          <div className="mx-side mb-3">
            <BackgroundImageSettings {...backgroundImageState} />
          </div>
        </ModalWithCloseButton>
      </>
    )
  }
}
