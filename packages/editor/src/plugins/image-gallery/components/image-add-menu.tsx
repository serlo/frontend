import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { EditorPluginType } from '@editor/package'
import { PixabayImageSearch } from '@editor/plugins/image/components/pixabay-image-search'
import { isImageUrl } from '@editor/plugins/image/utils/check-image-url'
import {
  faInfinity,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import type { ImageGalleryProps } from '..'
import { ImageGalleryPluginContext } from '../contexts/context'
import { ImageGalleryPluginActionTypes } from '../contexts/types'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { cn } from '@/helper/cn'

export function createImagePlugin(url: string, caption: string) {
  return {
    plugin: EditorPluginType.Image,
    state: {
      src: url,
      caption: {
        plugin: EditorPluginType.Text,
        state: [
          {
            type: 'p',
            children: [
              {
                text: caption,
              },
            ],
          },
        ],
        id: uuidv4(),
      },
    },
    id: uuidv4(),
  }
}

interface ImageSelectionScreenProps extends ImageGalleryProps {
  setIsAButtonFocused?: (isFocused: boolean) => void
  disableFileUpload?: boolean
}

// TODO: This component is a copy of ImageSelectionScreen from the Image plugin
//       Refactor / Combine the two components
export function AddImagesMenu(props: ImageSelectionScreenProps) {
  const { imageGalleryPluginDispatch } = useContext(ImageGalleryPluginContext)

  const editorStrings = useEditorStrings()
  const { state, setIsAButtonFocused, disableFileUpload } = props

  const imageStrings = editorStrings.plugins.image
  const [imageUrl, setImageUrl] = useState('')

  const placeholder = imageStrings.placeholderEmpty

  const [showPixabayModal, setShowPixabayModal] = useState(false)
  const showErrorMessage = imageUrl.length > 5 && !isImageUrl(imageUrl)

  const onSelectPixabayImage = (imageUrl: string) => {
    setImageUrl(imageUrl)
    setShowPixabayModal(false)
  }

  const showPixabayButton = !disableFileUpload

  useEffect(() => {}, [imageUrl, imageGalleryPluginDispatch])

  const onChangeUrl = (newUrl: string) => {
    setImageUrl(newUrl)

    const isValidImageUrl = newUrl.length > 5 && isImageUrl(newUrl)

    if (!isValidImageUrl) return

    const newImagePlugin = createImagePlugin(newUrl, '')
    state.images.insert(undefined, newImagePlugin)
    imageGalleryPluginDispatch({
      type: ImageGalleryPluginActionTypes.SET_IMAGES,
      payload: null,
    })
  }

  // TODO: Remove this Dev helper Function
  const insertSampleImages = () => {
    state.images.insert(
      0,
      createImagePlugin(
        'https://www.shutterstock.com/image-vector/two-opponents-facing-each-other-260nw-2296619399.jpg',
        ''
      )
    )
    state.images.insert(
      1,
      createImagePlugin(
        'https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg',
        ''
      )
    )
    state.images.insert(
      2,
      createImagePlugin(
        'https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg',
        ''
      )
    )
    state.images.insert(
      3,
      createImagePlugin(
        'https://cdn.pixabay.com/photo/2024/02/15/14/31/donkey-8575524_960_720.jpg',
        ''
      )
    )
    imageGalleryPluginDispatch({
      type: ImageGalleryPluginActionTypes.SET_IMAGES,
      payload: null,
    })
  }

  // TODO: Include upload button and allow multiple

  return (
    <div
      className="mx-auto rounded-md bg-yellow-50 p-8 shadow-md"
      data-qa="plugin-image-empty-wrapper"
    >
      <ModalWithCloseButton
        isOpen={showPixabayModal}
        setIsOpen={setShowPixabayModal}
        className="max-h-[700px] w-[900px] max-w-[90vw] pt-0"
      >
        <PixabayImageSearch onSelectImage={onSelectPixabayImage} />
      </ModalWithCloseButton>

      <div className="mx-auto my-8 w-[60%]">
        {showPixabayButton && (
          <button
            data-qa="plugin-image-pixabay-search-button"
            onClick={() => setShowPixabayModal(true)}
            onFocus={() => setIsAButtonFocused && setIsAButtonFocused(true)}
            onBlur={() => setIsAButtonFocused && setIsAButtonFocused(false)}
            className="mb-4 flex min-w-full flex-shrink-0 items-center justify-center rounded-lg bg-editor-primary-200 p-1 py-2 font-semibold text-almost-black text-gray-800 hover:bg-editor-primary-300"
          >
            <span className="mr-2 inline-block">
              <FaIcon icon={faMagnifyingGlass} />
            </span>
            {imageStrings.searchOnline}
          </button>
        )}
        <span className="mb-1 flex w-full justify-center font-medium text-almost-black">
          {imageStrings.imageUrl}
        </span>
        <span className="serlo-tooltip-trigger">
          <input
            placeholder={placeholder}
            value={imageUrl}
            onChange={(e) => onChangeUrl(e.target.value)}
            className={cn(
              'w-full rounded-lg border-0 bg-yellow-100 px-4 py-2 text-gray-600',
              showErrorMessage && 'outline outline-1 outline-red-500'
            )}
            onFocus={() => setIsAButtonFocused && setIsAButtonFocused(true)}
            onBlur={() => setIsAButtonFocused && setIsAButtonFocused(false)}
            data-qa="plugin-image-src"
          />
          {showErrorMessage && (
            <>
              <span
                className="mt-1 inline-block pl-1 text-sm font-semibold text-red-500"
                data-qa="plugin-image-src-error"
              >
                {imageStrings.invalidImageUrl}
              </span>
              <EditorTooltip text={imageStrings.invalidImageUrlMessage} />
            </>
          )}
        </span>
        {/* TODO: Remove this Dev Button */}
        <button
          onClick={() => insertSampleImages()}
          className="mb-4 mt-2 flex min-w-full flex-shrink-0 items-center justify-center rounded-lg bg-editor-primary-200 p-1 py-2 font-semibold text-almost-black text-gray-800 hover:bg-editor-primary-300"
        >
          <span className="mr-2 inline-block">
            <FaIcon icon={faInfinity} />
          </span>
          Sample
        </button>
      </div>
    </div>
  )
}
