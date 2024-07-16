import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { isTempFile } from '@editor/plugin'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import React, { useState, type RefObject } from 'react'

import { PixabayImageSearch } from './pixabay-image-search'
import type { ImageProps } from '..'
import { UploadButton } from '../controls/upload-button'
import { isImageUrl } from '../utils/check-image-url'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { cn } from '@/helper/cn'
import { isProduction } from '@/helper/is-production'

export function ImageSelectionScreen(
  props: ImageProps & { urlInputRef: RefObject<HTMLInputElement> }
) {
  const editorStrings = useEditorStrings()
  const { state, urlInputRef } = props
  const { src, licence } = state

  const imageStrings = editorStrings.plugins.image
  const disableFileUpload = props.config.disableFileUpload // HACK: Temporary solution to make image plugin available in Moodle & Chancenwerk integration with file upload disabled.

  const placeholder = !isTempFile(src.value)
    ? imageStrings.placeholderEmpty
    : !src.value.failed
      ? imageStrings.placeholderUploading
      : imageStrings.placeholderFailed

  const imageUrl = src.get() as string
  const showErrorMessage = imageUrl.length > 5 && !isImageUrl(imageUrl)

  const [showPixabayModal, setShowPixabayModal] = useState(false)

  const onSelectPixabayImage = (imageUrl: string) => {
    state.src.set(imageUrl)
    if (!licence.defined) licence.create('Pixabay')
    else licence.set('Pixabay')
    setShowPixabayModal(false)
  }

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
        <UploadButton {...props} />
        {!disableFileUpload && !isProduction && (
          <button
            onClick={() => setShowPixabayModal(true)}
            className="almost-black mb-4 flex min-w-full flex-shrink-0 items-center justify-center rounded-lg bg-editor-primary-200 p-1 py-2 font-semibold text-gray-800 hover:bg-editor-primary-300"
          >
            <span className="mr-2 inline-block">
              <FaIcon icon={faMagnifyingGlass} />
            </span>
            {imageStrings.searchOnline}
          </button>
        )}
        <span className="mb-1 flex w-full justify-center font-bold">
          {imageStrings.imageUrl}
        </span>
        <span className="serlo-tooltip-trigger">
          <input
            ref={urlInputRef}
            placeholder={placeholder}
            value={!isTempFile(src.value) ? src.value : ''}
            disabled={isTempFile(src.value) && !src.value.failed}
            onChange={(e) => state.src.set(e.target.value)}
            className={cn(
              'w-full rounded-lg border-0 bg-yellow-100 px-4 py-2 text-gray-600',
              showErrorMessage && 'outline outline-1 outline-red-500'
            )}
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
      </div>
    </div>
  )
}
