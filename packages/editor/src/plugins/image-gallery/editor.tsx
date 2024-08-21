import { useEffect, useState } from 'react'

import type { ImageGalleryProps } from '.'
import { AddImages, createImagePlugin } from './components/add-images'
import { ImageGrid } from './components/image-grid'
import { SingleImageModal } from './components/single-image-modal'
import { ImageGalleryToolbar } from './toolbar'

export enum ImageGalleryPluginViewType {
  INIT = 'INIT', // Initial state, no images
  SINGLE_IMAGE_MODAL = 'SINGLE_IMAGE_MODAL', // Image selection modal
  GALLERY = 'GALLERY', // Image grid
}

export function ImageGalleryEditor(props: ImageGalleryProps) {
  const { focused, state } = props

  const [currentView, setCurrentView] = useState(
    ImageGalleryPluginViewType.INIT
  )

  const [currentImageIndex, setCurrentImageIndex] = useState(-1)

  // Restore correct view based on state
  // If there are images in the state, set the view to GALLERY
  useEffect(() => {
    if (
      currentView === ImageGalleryPluginViewType.INIT &&
      state.images.length > 0
    ) {
      setCurrentView(ImageGalleryPluginViewType.GALLERY)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              setCurrentImageIndex(0)
              setCurrentView(ImageGalleryPluginViewType.SINGLE_IMAGE_MODAL)
            }}
            {...props}
          />
        )
      case ImageGalleryPluginViewType.SINGLE_IMAGE_MODAL:
        return (
          <SingleImageModal
            {...props}
            currentImageIndex={currentImageIndex}
            onAddImage={(isDebugRun: boolean) => {
              isDebugRun && prepareDebugData()
              setCurrentView(ImageGalleryPluginViewType.GALLERY)
            }}
          />
        )
      case ImageGalleryPluginViewType.GALLERY:
        return (
          <ImageGrid
            {...props}
            onClickImage={(index: number) => {
              setCurrentImageIndex(index)
              setCurrentView(ImageGalleryPluginViewType.SINGLE_IMAGE_MODAL)
            }}
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
