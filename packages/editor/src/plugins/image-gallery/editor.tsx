import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import {
  focus,
  selectHasFocusedChild,
  selectIsDocumentEmpty,
  store,
  useAppDispatch,
  useAppSelector,
} from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEffect, useState } from 'react'

import type { ImageGalleryProps } from '.'
import { AddImagesButton } from './components/add-images-button'
import { EditorImageGrid } from './components/editor-image-grid'
import { ImageGalleryToolbar } from './toolbar'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { showToastNotice } from '@/helper/show-toast-notice'

const MAX_IMAGES = 8

function replaceWithMaxImages(input: string) {
  return input.replace('%max_images%', MAX_IMAGES.toString())
}

export function ImageGalleryEditor(props: ImageGalleryProps) {
  const { id, focused, state } = props

  const [oldFocusState, setOldFocusState] = useState(focused)
  const [hasImages, setHasImages] = useState(state.images.length > 0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const imageGalleryStrings = useEditorStrings().plugins.imageGallery

  const imagePlugin = editorPlugins.getByType(EditorPluginType.Image)

  const dispatch = useAppDispatch()

  const isAnyImageFocused = useAppSelector((state) =>
    selectHasFocusedChild(state, id)
  )

  function handleAddImagesButtonClick() {
    if (state.images.length >= MAX_IMAGES) {
      showToastNotice(
        replaceWithMaxImages(imageGalleryStrings.alreadyMaxImagesMessage),
        'warning'
      )
      return
    }

    state.images.insert(state.images.length, {
      imagePlugin: { plugin: EditorPluginType.Image },
      dimensions: { width: 0, height: 0 },
    })
    setCurrentImageIndex(state.images.length)
    setIsModalOpen(true)
  }

  function handleMultipleImageUpload(files: File[]) {
    if (state.images.length + files.length > MAX_IMAGES) {
      showToastNotice(
        replaceWithMaxImages(imageGalleryStrings.tooManyImagesMessage),
        'warning'
      )
    } else {
      for (const file of files) {
        const newImagePluginState = imagePlugin.onFiles?.([file])
        const newImagePlugin = {
          plugin: EditorPluginType.Image,
          state: newImagePluginState?.state as unknown,
        }
        state.images.insert(currentImageIndex, {
          imagePlugin: newImagePlugin,
          dimensions: { width: 0, height: 0 },
        })
      }
    }

    setHasImages(true)
    setIsModalOpen(false)
    dispatch(focus(id))
  }

  function removeDefaultEmptyImagePlugin() {
    const defaultImagePluginId = state.images[currentImageIndex].imagePlugin.id
    if (selectIsDocumentEmpty(store.getState(), defaultImagePluginId)) {
      state.images.remove(currentImageIndex)
    }
  }

  function handleImageModalClose() {
    removeDefaultEmptyImagePlugin()
    setIsModalOpen(false)
  }

  function handleImageClick(index: number) {
    // first click on plugin should focus it, not open the modal
    if (!oldFocusState) return
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  function handleRemoveImageButtonClick(index: number) {
    state.images.remove(index)
  }

  useEffect(() => {
    if (state.images.length === 0) setHasImages(false)
  }, [state.images.length])

  // to make sure the modal does not open on first click
  // we need to store the old focus state
  // (otherwise the mouseDown event would focus it and the modal would open immediately)
  useEffect(() => {
    if (focused) setTimeout(() => setOldFocusState(true), 100)
    else setOldFocusState(false)
  }, [focused])

  return (
    <div data-qa="plugin-image-gallery-wrapper">
      {focused || isAnyImageFocused ? (
        <ImageGalleryToolbar
          id={id}
          onAddImagesButtonClick={handleAddImagesButtonClick}
        />
      ) : null}

      {hasImages ? (
        <EditorImageGrid
          state={state}
          onImageClick={handleImageClick}
          onRemoveImageButtonClick={handleRemoveImageButtonClick}
        />
      ) : (
        <AddImagesButton onClick={handleAddImagesButtonClick} />
      )}

      <ModalWithCloseButton
        className="my-6 p-0 [&_.plugin-image]:!-ml-[5px] [&_img]:max-h-[70vh]"
        extraTitleClassName="sr-only"
        extraCloseButtonClassName="sr-only"
        isOpen={isModalOpen}
        title={imageGalleryStrings.modalScreenReaderTitle}
        setIsOpen={(isOpen) => {
          if (!isOpen) handleImageModalClose()
        }}
      >
        {state.images.map(({ imagePlugin }, index) => (
          <div
            key={imagePlugin.id}
            className={`-mb-6 pt-10 ${index === currentImageIndex ? '' : 'hidden'}`}
          >
            {imagePlugin.render({
              config: { onMultipleUpload: handleMultipleImageUpload },
            })}
          </div>
        ))}
      </ModalWithCloseButton>
    </div>
  )
}
