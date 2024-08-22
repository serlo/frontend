import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useState } from 'react'

import type { ImageGalleryProps } from '.'
import { AddImages } from './components/add-images'
import { SingleImageModal } from './components/single-image-modal'
import { ImageGalleryToolbar } from './toolbar'

enum ImageGalleryPluginViewType {
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
  const imagePlugin = editorPlugins.getByType(EditorPluginType.Image)

  const handleMultipleImageUpload = (files: File[]) => {
    for (const file of files) {
      const newImagePluginState = imagePlugin.onFiles?.([file])
      const newImagePlugin = {
        plugin: EditorPluginType.Image,
        state: newImagePluginState?.state as unknown,
      }
      state.images.insert(currentImageIndex, newImagePlugin)
    }
  }

  return (
    <div data-qa="plugin-image-gallery-wrapper">
      {focused ? <ImageGalleryToolbar {...props} /> : null}

      {currentView === ImageGalleryPluginViewType.INIT && (
        <AddImages
          onAddImages={() => {
            state.images.insert(0, {
              plugin: EditorPluginType.Image,
            })
            setCurrentView(ImageGalleryPluginViewType.ADD_IMAGES)
            setCurrentImageIndex(0)
          }}
          {...props}
        />
      )}

      {currentView === ImageGalleryPluginViewType.ADD_IMAGES && (
        <SingleImageModal
          {...props}
          currentImageIndex={currentImageIndex}
          onAddImage={() => {
            setCurrentView(ImageGalleryPluginViewType.INIT)
          }}
          handleMultipleImageUpload={handleMultipleImageUpload}
        />
      )}
    </div>
  )
}
