import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import {
  focus,
  selectHasFocusedChild,
  useAppDispatch,
  useAppSelector,
} from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { MouseEvent, useEffect, useState } from 'react'

import type { ImageGalleryProps } from '.'
import { AddImagesButton } from './components/add-images-button'
import { EditorImageGrid } from './components/editor-image-grid'
import { ImageGalleryToolbar } from './toolbar'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

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

  function handleImageClick(event: MouseEvent, index: number) {
    // first click on plugin should focus it, not open the modal
    if (!oldFocusState) return
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  // to make sure the modal does not open on first click
  // we need to store the old focus state
  // (otherwise the mouseDown event would focus it and the modal would open immediately)
  useEffect(() => {
    if (focused) setTimeout(() => setOldFocusState(true), 100)
    else setOldFocusState(false)
  }, [focused])

  return (
    <div data-qa="plugin-image-gallery-wrapper">
      {focused || isAnyImageFocused ? <ImageGalleryToolbar id={id} /> : null}

      {hasImages ? (
        <EditorImageGrid state={state} handleImageClick={handleImageClick} />
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
        {state.images.map((image, index) => (
          <div
            key={image.id}
            className={`-mb-6 pt-10 ${index === currentImageIndex ? '' : 'hidden'}`}
          >
            {image.render({
              config: { onMultipleUpload: handleMultipleImageUpload },
            })}
          </div>
        ))}
      </ModalWithCloseButton>
    </div>
  )
}
