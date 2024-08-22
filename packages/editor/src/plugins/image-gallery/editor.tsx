import { useState } from 'react'

import type { ImageGalleryProps } from '.'
import { AddImages } from './components/add-images'
import { SingleImageModal } from './components/single-image-modal'
import { ImageGalleryToolbar } from './toolbar'
import { createEmptyImagePlugin } from './utils/create-empty-image-plugin'

export enum ImageGalleryPluginViewType {
  INIT = 'INIT', // Initial state, no images
  ADD_IMAGES = 'ADD_IMAGES', // Image selection screen
  GALLERY = 'GALLERY', // Image grid
}

export function ImageGalleryEditor(props: ImageGalleryProps) {
  const { state, focused } = props

  const [currentView, setCurrentView] = useState(
    ImageGalleryPluginViewType.INIT
  )

  const [currentImageIndex, setCurrentImageIndex] = useState(-1)

  const handleMultipleImageUpload = (files: File[]) => {
    console.log(files)
  }

  const renderContent = () => {
    switch (currentView) {
      case ImageGalleryPluginViewType.INIT:
        return (
          <AddImages
            onAddImages={() => {
              state.images.insert(0, createEmptyImagePlugin('', ''))
              setCurrentView(ImageGalleryPluginViewType.ADD_IMAGES)
              setCurrentImageIndex(0)
            }}
            {...props}
          />
        )
      case ImageGalleryPluginViewType.ADD_IMAGES:
        return (
          <SingleImageModal
            {...props}
            currentImageIndex={currentImageIndex}
            onAddImage={() => {
              setCurrentView(ImageGalleryPluginViewType.INIT)
            }}
            handleMultipleImageUpload={handleMultipleImageUpload}
          />
        )
      default:
        return null
    }
  }
  return (
    <div data-qa="plugin-image-gallery-wrapper">
      {focused ? <ImageGalleryToolbar {...props} /> : null}
      {renderContent()}
    </div>
  )
}
