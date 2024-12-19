import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { isTempFile } from '@editor/plugin'
import { cn } from '@editor/utils/cn'
import React, { type RefObject } from 'react'

import type { VideoProps } from '..'
import { UploadButton } from './upload-button'

interface VideoSelectionScreenProps {
  state: VideoProps['state']
  urlInputRef: RefObject<HTMLInputElement>
  setIsAButtonFocused: (isFocused: boolean) => void
}

export function VideoSelectionScreen({
  state,
  urlInputRef,
  setIsAButtonFocused,
}: VideoSelectionScreenProps) {
  const editorStrings = useEditStrings()
  const { src } = state

  const imageStrings = editorStrings.plugins.image

  const placeholder = !isTempFile(src.value)
    ? imageStrings.placeholderEmpty
    : !src.value.failed
      ? imageStrings.placeholderUploading
      : imageStrings.placeholderFailed

  // const imageUrl = src.value as string
  // const showErrorMessage = imageUrl.length > 5 && !isImageUrl(imageUrl)
  const showErrorMessage = false

  return (
    <div
      className="mx-auto rounded-md bg-yellow-50 p-8 shadow-md"
      data-qa="plugin-image-empty-wrapper"
    >
      <div className="mx-auto my-8 w-[60%]">
        <UploadButton
          src={src}
          onFocus={() => setIsAButtonFocused(true)}
          onBlur={() => setIsAButtonFocused(false)}
        />
        <span className="mb-1 flex w-full justify-center font-medium text-almost-black">
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
