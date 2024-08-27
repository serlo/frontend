import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { focus, selectFocused, store, useAppDispatch } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { MouseEvent, useEffect, useState } from 'react'

import type { ImageGalleryProps } from '.'
import { AddImagesButton } from './components/add-images-button'
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
  const { id, focused, state } = props

  const [currentView, setCurrentView] = useState(
    ImageGalleryPluginViewType.EMPTY
  )

  const [currentImageIndex, setCurrentImageIndex] = useState(-1)
  const imagePlugin = editorPlugins.getByType(EditorPluginType.Image)

  const dispatch = useAppDispatch()

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

  const isAnyImageFocused = state.images.some(
    ({ id }) => id === selectFocused(store.getState())
  )

  function handleAddImagesButtonClick() {
    if (state.images.length === 0) {
      state.images.insert(0, { plugin: EditorPluginType.Image })
    }
    setCurrentView(ImageGalleryPluginViewType.SINGLE_IMAGE_MODAL)
    setCurrentImageIndex(0)
  }

  function handleMultipleImageUpload(files: File[]) {
    for (const file of files) {
      const newImagePluginState = imagePlugin.onFiles?.([file])
      const newImagePlugin = {
        plugin: EditorPluginType.Image,
        state: newImagePluginState?.state as unknown,
      }
      state.images.insert(currentImageIndex, newImagePlugin)
    }
  }

  function handleImageModalClose() {
    const src = getImageSrcFromState(state.images[0].get())
    const didSetImage = src !== ''
    setCurrentView(
      didSetImage
        ? ImageGalleryPluginViewType.GALLERY
        : ImageGalleryPluginViewType.EMPTY
    )
    dispatch(focus(id))
  }

  function handleImageMouseDown(event: MouseEvent, index: number) {
    if (!focused && !isAnyImageFocused) {
      event.preventDefault()
      event.stopPropagation()
      dispatch(focus(id))
    } else {
      setCurrentImageIndex(index)
      setCurrentView(ImageGalleryPluginViewType.SINGLE_IMAGE_MODAL)
    }
  }

  return (
    <div data-qa="plugin-image-gallery-wrapper">
      {focused || isAnyImageFocused ? <ImageGalleryToolbar id={id} /> : null}

      {currentView === ImageGalleryPluginViewType.EMPTY ? (
        <AddImagesButton onClick={handleAddImagesButtonClick} />
      ) : null}

      {currentView === ImageGalleryPluginViewType.SINGLE_IMAGE_MODAL ? (
        <SingleImageModal
          currentImageState={state.images[currentImageIndex]}
          onClose={handleImageModalClose}
          onMultipleUploadCallback={handleMultipleImageUpload}
        />
      ) : null}

      {currentView === ImageGalleryPluginViewType.GALLERY ? (
        <EditorImageGrid
          state={state}
          onImageMouseDown={handleImageMouseDown}
        />
      ) : null}
    </div>
  )
}
