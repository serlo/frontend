import { useState } from 'react'

import type { ImageGalleryProps } from '..'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface SingleImageModalProps {
  currentImageState: ImageGalleryProps['state']['images'][0]
  onClose: () => void
  handleMultipleImageUpload: (files: File[]) => void
}

export function SingleImageModal(props: SingleImageModalProps) {
  const { currentImageState, onClose, handleMultipleImageUpload } = props

  const [open, setOpen] = useState(true)
  const pluginStrings = useEditorStrings().plugins.imageGallery

  return (
    <ModalWithCloseButton
      className="p-0"
      extraTitleClassName="sr-only"
      extraCloseButtonClassName="sr-only"
      isOpen={open}
      title={pluginStrings.modalScreenReaderTitle}
      setIsOpen={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
          onClose()
        }
      }}
    >
      <div className="-mb-6 pt-10">
        {currentImageState.render({
          config: {
            onMultipleUploadCallback: handleMultipleImageUpload,
          },
        })}
      </div>
    </ModalWithCloseButton>
  )
}
