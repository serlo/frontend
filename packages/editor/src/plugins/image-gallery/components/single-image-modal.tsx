import React, { useContext } from 'react'

import type { ImageGalleryProps } from '..'
import { ImageGalleryPluginContext } from '../contexts/context'
import { ImageGalleryPluginActionTypes } from '../contexts/types'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'

interface SingleImageModalProps {
  state: ImageGalleryProps['state']
}
export function SingleImageModal(props: SingleImageModalProps) {
  const { state } = props
  const { imageGalleryPluginState, imageGalleryPluginDispatch } = useContext(
    ImageGalleryPluginContext
  )

  const handleModalOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      imageGalleryPluginDispatch({
        type: ImageGalleryPluginActionTypes.CLOSE_MODAL,
        payload: null,
      })
    }
  }

  const imageToEdit = state.images.find(
    (image) => image.id === imageGalleryPluginState.selectedImageId
  )

  return (
    <ModalWithCloseButton
      isOpen={imageGalleryPluginState.isEditImageModalOpen}
      setIsOpen={handleModalOpenChange}
      className="max-h-80vw mt-20 flex w-[900px] max-w-[90vw] items-center justify-center pt-10"
      extraTitleClassName="sr-only"
      title="Edit Image"
    >
      <div
        className="max-h-70vw  my-auto rounded-md bg-yellow-50 p-8 align-middle shadow-md"
        data-qa="plugin-image-empty-wrapper"
      >
        {imageToEdit && imageToEdit.render()}
      </div>
    </ModalWithCloseButton>
  )
}
