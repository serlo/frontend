import IconChoose from '@editor/editor-ui/assets/plugin-icons/image-gallery/icon-layered-images.svg'
import React, { useContext } from 'react'

import { ImageGalleryPluginContext } from '../contexts/context'
import { ImageGalleryPluginActionTypes } from '../contexts/types'

export function AddImagesScreen() {
  const { imageGalleryPluginDispatch } = useContext(ImageGalleryPluginContext)

  const onClick = () => {
    imageGalleryPluginDispatch({
      type: ImageGalleryPluginActionTypes.START,
      payload: null,
    })
  }

  return (
    <div
      className="mx-auto my-auto flex items-center justify-center rounded-md bg-yellow-50 p-8 shadow-md"
      data-qa="plugin-image-gallery-first-screen"
    >
      <button
        className="my-20 text-editor-primary-100 hover:cursor-pointer hover:text-editor-primary-200"
        onClick={onClick}
      >
        <IconChoose />
      </button>
    </div>
  )
}
