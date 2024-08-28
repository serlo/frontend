import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import {
  focus,
  selectHasFocusedChild,
  useAppDispatch,
  useAppSelector,
} from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { MouseEvent, useState } from 'react'

import type { ImageGalleryProps } from '.'
import { AddImagesButton } from './components/add-images-button'
import { EditorImageGrid } from './components/editor-image-grid'
import { ImageGalleryToolbar } from './toolbar'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function ImageGalleryEditor(props: ImageGalleryProps) {
  const { id, focused, state } = props

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
    if (state.images.length === 0) {
      state.images.insert(0, { plugin: EditorPluginType.Image })
    }
    setIsModalOpen(true)
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
    setHasImages(true)
    setIsModalOpen(false)
    dispatch(focus(id))
  }

  function handleImageModalClose() {
    setIsModalOpen(false)
  }

  function handleImageMouseDown(event: MouseEvent, index: number) {
    if (!focused && !isAnyImageFocused) {
      event.stopPropagation()
      dispatch(focus(id))
    } else {
      setCurrentImageIndex(index)
      setIsModalOpen(true)
    }
  }

  return (
    <div data-qa="plugin-image-gallery-wrapper">
      {focused || isAnyImageFocused ? <ImageGalleryToolbar id={id} /> : null}

      {hasImages ? (
        <EditorImageGrid
          state={state}
          onImageMouseDown={handleImageMouseDown}
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
        {state.images.map((image, index) => {
          return (
            <div
              key={image.id}
              className={`-mb-6 pt-10 ${index === currentImageIndex ? '' : 'hidden'}`}
            >
              {image.render({
                config: {
                  onMultipleUploadCallback: handleMultipleImageUpload,
                },
              })}
            </div>
          )
        })}
      </ModalWithCloseButton>
    </div>
  )
}
