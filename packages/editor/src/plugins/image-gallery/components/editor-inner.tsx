import { useContext, useEffect } from 'react'

import { AddImagesScreen } from './add-images'
import { AddImagesMenu } from './image-add-menu'
import { ImageGrid } from './image-grid'
import { SingleImageModal } from './single-image-modal'
import type { ImageGalleryProps } from '..'
import { ImageGalleryPluginContext } from '../contexts/context'
import {
  ImageGalleryPluginActionTypes,
  ImageGalleryPluginViewType,
} from '../contexts/types'
import { ImageGalleryToolbar } from '../toolbar'

export function ImageGalleryEditorInner(props: ImageGalleryProps) {
  const { state } = props
  const { imageGalleryPluginState, imageGalleryPluginDispatch } = useContext(
    ImageGalleryPluginContext
  )

  // Restore correct view based on state
  // If there are images in the state, set the view to GALLERY
  useEffect(() => {
    if (
      imageGalleryPluginState.view === ImageGalleryPluginViewType.INIT &&
      state.images.length > 0
    ) {
      imageGalleryPluginDispatch({
        type: ImageGalleryPluginActionTypes.SET_VIEW,
        payload: {
          view: ImageGalleryPluginViewType.GALLERY,
        },
      })
    }
  })

  const renderContent = () => {
    switch (imageGalleryPluginState.view) {
      case ImageGalleryPluginViewType.INIT:
        return <AddImagesScreen />
      case ImageGalleryPluginViewType.ADD_IMAGES:
        return <AddImagesMenu {...props} />
      case ImageGalleryPluginViewType.GALLERY:
        return <ImageGrid {...props} />
      default:
        return null
    }
  }

  return (
    <div className="group/image-gallery" data-qa="plugin-image-gallery-wrapper">
      <ImageGalleryToolbar {...props} />
      <SingleImageModal state={state} />
      {renderContent()}
    </div>
  )
}
