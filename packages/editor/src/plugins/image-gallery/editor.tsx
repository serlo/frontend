import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEffect, useState } from 'react'

import type { ImageGalleryProps } from '.'
import { AddImages } from './components/add-images'
import { EditorImageGrid } from './components/editor-image-grid'
import { SingleImageModal } from './components/single-image-modal'
import { ImageGalleryToolbar } from './toolbar'
import { getImageSrcFromState } from './utils/helpers'

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

  const [isGalleryInitialised, setIsGalleryInitialised] = useState(false)

  const [currentImageId, setCurrentImageId] = useState('')
  const imagePlugin = editorPlugins.getByType(EditorPluginType.Image)

  // Restore correct view based on state
  // If there are images in the state, set the view to GALLERY
  useEffect(() => {
    if (
      currentView === ImageGalleryPluginViewType.EMPTY &&
      state.images.length > 0
    ) {
      setIsGalleryInitialised(true)
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
      state.images.insert(undefined, newImagePlugin)
    }
  }

  return (
    <div data-qa="plugin-image-gallery-wrapper">
      {focused ? <ImageGalleryToolbar {...props} /> : null}

      {currentView === ImageGalleryPluginViewType.EMPTY && (
        <AddImages
          onAddImages={() => {
            if (state.images.length === 0) {
              state.images.insert(0, {
                plugin: EditorPluginType.Image,
              })
            }
            setCurrentView(ImageGalleryPluginViewType.SINGLE_IMAGE_MODAL)
            setCurrentImageId('')
          }}
          {...props}
        />
      )}

      {currentView === ImageGalleryPluginViewType.SINGLE_IMAGE_MODAL && (
        <SingleImageModal
          {...props}
          currentImageState={state.images.find(
            (image) => image.id === currentImageId
          )}
          onClose={() => {
            const src = getImageSrcFromState(state.images[0].get())
            const didSetImage = src !== ''
            if (!didSetImage) {
              setCurrentView(ImageGalleryPluginViewType.EMPTY)
              return
            }
            setIsGalleryInitialised(didSetImage)
            setCurrentView(ImageGalleryPluginViewType.GALLERY)
          }}
          handleMultipleImageUpload={handleMultipleImageUpload}
        />
      )}

      {isGalleryInitialised && (
        <EditorImageGrid
          {...props}
          onClickImage={(id: string) => {
            setCurrentImageId(id)
            setCurrentView(ImageGalleryPluginViewType.SINGLE_IMAGE_MODAL)
          }}
        />
      )}
    </div>
  )
}
