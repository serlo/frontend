import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { isTempFile } from '@editor/plugin'
import { cn } from '@editor/utils/cn'
import React, { type RefObject } from 'react'

import type { VideoProps } from '..'
import { UploadButton } from './upload-button'
import { parseVideoUrl } from '../renderer'

interface VideoSelectionScreenProps {
  state: VideoProps['state']
  urlInputRef: RefObject<HTMLInputElement>
}

export function VideoSelectionScreen({
  state,
  urlInputRef,
}: VideoSelectionScreenProps) {
  const editorStrings = useEditStrings()
  const { src } = state

  const uploadStrings = editorStrings.edtrIo.fileUpload
  const videoStrings = editorStrings.plugins.video

  const placeholder = !isTempFile(src.value)
    ? videoStrings.placeholderEmpty
    : !src.value.failed
      ? uploadStrings.placeholderUploading
      : uploadStrings.placeholderFailed

  const videoUrl = src.value as string
  const [, type] = parseVideoUrl(
    isTempFile(state.src.value) ? '' : state.src.value
  )
  const couldBeValid = type !== undefined
  const showErrorMessage = videoUrl.length > 5 && !couldBeValid

  return (
    <div
      className="mx-auto rounded-md bg-yellow-50 p-8 shadow-md"
      data-qa="plugin-image-empty-wrapper"
    >
      <div className="mx-auto my-8 w-[60%]">
        <UploadButton src={src} />
        <span className="mb-1 flex w-full justify-center font-medium text-almost-black">
          {videoStrings.videoUrl}
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
                {uploadStrings.invalidUrl}
              </span>
              <EditorTooltip text={uploadStrings.invalidUrlMessage} />
            </>
          )}
        </span>
      </div>
    </div>
  )
}
