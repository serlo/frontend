import { useState } from 'react'

import type { ImageGalleryProps } from '.'
import { AddImages, createImagePlugin } from './components/add-images'
import { ImageGrid } from './components/image-grid'
import { SingleImageModal } from './components/single-image-modal'
import { ImageGalleryToolbar } from './toolbar'

export enum ImageGalleryPluginViewType {
  INIT = 'INIT', // Initial state, no images
  ADD_IMAGES = 'ADD_IMAGES', // Image selection screen
  GALLERY = 'GALLERY', // Image grid
}

export function ImageGalleryEditor(props: ImageGalleryProps) {
  const { focused, state } = props

  const [currentView, setCurrentView] = useState(
    ImageGalleryPluginViewType.INIT
  )

  const [currentImageIndex, setCurrentImageIndex] = useState(-1)

  // TODO: When Upload button is working with multiple files, this will be removed
  const prepareDebugData = () => {
    state.images.remove(0)
    state.images.insert(
      0,
      createImagePlugin(
        'https://www.shutterstock.com/image-vector/two-opponents-facing-each-other-260nw-2296619399.jpg'
      )
    )
    state.images.insert(
      1,
      createImagePlugin(
        'https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg'
      )
    )
    state.images.insert(
      2,
      createImagePlugin(
        'https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg'
      )
    )
    state.images.insert(
      3,
      createImagePlugin(
        'https://cdn.pixabay.com/photo/2024/02/15/14/31/donkey-8575524_960_720.jpg'
      )
    )
  }

  const renderContent = () => {
    switch (currentView) {
      case ImageGalleryPluginViewType.INIT:
        return (
          <AddImages
            onAddImages={() => {
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
              prepareDebugData()
              setCurrentView(ImageGalleryPluginViewType.GALLERY)
            }}
          />
        )
      case ImageGalleryPluginViewType.GALLERY:
        return <ImageGrid {...props} />

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
