import { useState } from 'react'

import { FittingModal } from './fitting-modal'
import type { ImageGalleryProps } from '..'

interface SingleImageModalProps {
  currentImageState: ImageGalleryProps['state']['images'][0]
  onAddImage: () => void
  handleMultipleImageUpload: (files: File[]) => void
}

export function SingleImageModal(props: SingleImageModalProps) {
  const { currentImageState, onAddImage, handleMultipleImageUpload } = props

  const [open, setOpen] = useState(true)

  return (
    <FittingModal
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
          onAddImage()
        }
      }}
    >
      {currentImageState.render({
        config: {
          onMultipleUploadCallback: handleMultipleImageUpload,
        },
      })}
    </FittingModal>
  )
}
