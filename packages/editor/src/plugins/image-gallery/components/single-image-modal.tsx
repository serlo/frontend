import { useState } from 'react'

import type { ImageGalleryProps } from '..'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'

interface SingleImageModalProps {
  currentImageState: ImageGalleryProps['state']['images'][0]
  onAddImage: () => void
  handleMultipleImageUpload: (files: File[]) => void
}

export function SingleImageModal(props: SingleImageModalProps) {
  const { currentImageState, onAddImage, handleMultipleImageUpload } = props

  const [open, setOpen] = useState(true)

  return (
    <ModalWithCloseButton
      className="p-0"
      extraCloseButtonClassName="sr-only"
      isOpen={open}
      setIsOpen={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
          onAddImage()
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
