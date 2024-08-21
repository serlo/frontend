import { useState } from 'react'

import { FittingModal } from './fitting-modal'
import type { ImageGalleryProps } from '..'

interface SingleImageModalProps extends ImageGalleryProps {
  currentImageIndex: number
  onAddImage: (isDebugRun: boolean) => void
}

export function SingleImageModal(props: SingleImageModalProps) {
  const { state, currentImageIndex, onAddImage } = props
  const image = state.images[currentImageIndex]

  const [open, setOpen] = useState(true)
  return (
    <FittingModal
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
          const shouldAddMockImagesToState =
            currentImageIndex === state.images.length - 1
          onAddImage(shouldAddMockImagesToState)
        }
      }}
    >
      {image.render()}
    </FittingModal>
  )
}
