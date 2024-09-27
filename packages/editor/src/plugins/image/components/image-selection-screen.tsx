import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { isTempFile } from '@editor/plugin'
import { cn } from '@editor/utils/cn'
import { useEditorStrings } from '@editor/utils/use-editor-strings'
import React, { type RefObject } from 'react'

import { PixabaySearchButton } from './pixabay-search-button'
import type { ImageProps } from '..'
import { UploadButton } from '../controls/upload-button'
import { isImageUrl } from '../utils/check-image-url'

interface ImageSelectionScreenProps {
  config: ImageProps['config']
  state: ImageProps['state']
  urlInputRef: RefObject<HTMLInputElement>
  setIsAButtonFocused: (isFocused: boolean) => void
}

export function ImageSelectionScreen({
  config,
  state,
  urlInputRef,
  setIsAButtonFocused,
}: ImageSelectionScreenProps) {
  const editorStrings = useEditorStrings()
  const { src, licence } = state

  const imageStrings = editorStrings.plugins.image
  const disableFileUpload = config.disableFileUpload // HACK: Temporary solution to make image plugin available in Moodle & Chancenwerk integration with file upload disabled.

  const placeholder = !isTempFile(src.value)
    ? imageStrings.placeholderEmpty
    : !src.value.failed
      ? imageStrings.placeholderUploading
      : imageStrings.placeholderFailed

  const imageUrl = src.value as string
  const showErrorMessage = imageUrl.length > 5 && !isImageUrl(imageUrl)

  const onSelectPixabayImage = (imageUrl: string) => {
    state.src.set(imageUrl)

    if (!licence.defined) licence.create('Pixabay')
    else licence.set('Pixabay')

    config.onMultipleUpload?.([])
  }

  const showPixabayButton = !disableFileUpload

  return (
    <div
      className="mx-auto rounded-md bg-yellow-50 p-8 shadow-md"
      data-qa="plugin-image-empty-wrapper"
    >
      <div className="mx-auto my-8 w-[60%]">
        <UploadButton
          config={config}
          src={src}
          onFocus={() => setIsAButtonFocused(true)}
          onBlur={() => setIsAButtonFocused(false)}
        />
        {showPixabayButton && (
          <PixabaySearchButton
            onFocus={() => setIsAButtonFocused(true)}
            onBlur={() => setIsAButtonFocused(false)}
            onSelectImage={onSelectPixabayImage}
          />
        )}
        <span className="mb-1 flex w-full justify-center font-medium text-almost-black">
          {imageStrings.imageUrl}
        </span>
        <span className="serlo-tooltip-trigger">
          <input
            ref={urlInputRef}
            placeholder={placeholder}
            value={!isTempFile(src.value) ? src.value : ''}
            disabled={isTempFile(src.value) && !src.value.failed}
            onChange={(e) => {
              state.src.set(e.target.value)
              if (config.onMultipleUpload) {
                setTimeout(() => {
                  config.onMultipleUpload?.([])
                })
              }
            }}
            className={cn(
              'w-full rounded-lg border-0 bg-yellow-100 px-4 py-2 text-gray-600',
              showErrorMessage && 'outline outline-1 outline-red-500'
            )}
            onFocus={() => setIsAButtonFocused(true)}
            onBlur={() => setIsAButtonFocused(false)}
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
