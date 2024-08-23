import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEffect, useState } from 'react'

import type { ImageGalleryProps } from '.'
import { AddImages } from './components/add-images'
import { ImageGrid } from './components/image-grid'
import { SingleImageModal } from './components/single-image-modal'
import { ImageGalleryToolbar } from './toolbar'

enum ImageGalleryPluginViewType {
  EMPTY = 'EMPTY',
  SINGLE_IMAGE_MODAL = 'SINGLE_IMAGE_MODAL',
  GALLERY = 'GALLERY',
}

export function ImageGalleryEditor(props: ImageGalleryProps) {
  const { focused, state } = props

  const [currentView, setCurrentView] = useState(
    ImageGalleryPluginViewType.EMPTY
  )

  const [currentImageIndex, setCurrentImageIndex] = useState(-1)
  const imagePlugin = editorPlugins.getByType(EditorPluginType.Image)

  // Restore correct view based on state
  // If there are images in the state, set the view to GALLERY
  useEffect(() => {
    if (
      currentView === ImageGalleryPluginViewType.EMPTY &&
      state.images.length > 0
    ) {
      setCurrentView(ImageGalleryPluginViewType.GALLERY)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

      {currentView === ImageGalleryPluginViewType.EMPTY && (
        <AddImages
          onAddImages={() => {
            state.images.insert(0, {
              plugin: EditorPluginType.Image,
            })
            setCurrentView(ImageGalleryPluginViewType.SINGLE_IMAGE_MODAL)
            setCurrentImageIndex(0)
          }}
          {...props}
        />
      )}

      {currentView === ImageGalleryPluginViewType.SINGLE_IMAGE_MODAL && (
        <SingleImageModal
          {...props}
          currentImageState={state.images[currentImageIndex]}
          onClose={() => {
            setCurrentView(ImageGalleryPluginViewType.GALLERY)
          }}
          handleMultipleImageUpload={handleMultipleImageUpload}
        />
      )}

      {[
        ImageGalleryPluginViewType.SINGLE_IMAGE_MODAL,
        ImageGalleryPluginViewType.GALLERY,
      ].includes(currentView) && (
        <ImageGrid
          {...props}
          onClickImage={(index: number) => {
            setCurrentImageIndex(index)
            setCurrentView(ImageGalleryPluginViewType.SINGLE_IMAGE_MODAL)
          }}
        />
      )}
    </div>
  )
}
