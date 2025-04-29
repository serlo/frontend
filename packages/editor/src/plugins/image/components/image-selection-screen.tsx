import { EditorMetaContext } from '@editor/core/contexts/editor-meta-context'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { isTempFile } from '@editor/plugin'
import { cn } from '@editor/utils/cn'
import React, { useContext, type RefObject } from 'react'

import type { ImageProps } from '..'
import { PixabaySearch } from './pixabay-search/pixabay-search'
import { UploadButton } from '../controls/upload-button'
import { isImageUrl } from '../utils/check-image-url'
import { useUploadFile } from '../utils/upload-file'

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
  const editorStrings = useEditStrings()
  const uploadStrings = editorStrings.edtrIo.fileUpload
  const imageStrings = editorStrings.plugins.image

  const { src, licence } = state
  const upload = useUploadFile()

  // HACK: Temporary solution to make image plugin available in Moodle & Chancenwerk integration with file upload disabled.
  const disableMediaUpload = useContext(EditorMetaContext).disableMediaUpload

  const placeholder = !isTempFile(src.value)
    ? imageStrings.placeholderEmpty
    : !src.value.failed
      ? uploadStrings.placeholderUploading
      : uploadStrings.placeholderFailed

  const imageUrl = src.value as string
  const showErrorMessage = imageUrl.length > 5 && !isImageUrl(imageUrl)

  function onSelectPixabayImage(pixabayUrl: string) {
    // get file extension from url
    const filesArray = pixabayUrl.split('.')
    const fileExtension = filesArray[filesArray.length - 1].split('?')[0]

    try {
      // pixbay supports cors so we can directly fetch the image
      void fetch(pixabayUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'image.' + fileExtension, blob)
          void src.upload(file, upload).then(() => {
            if (!licence.defined) licence.create('Pixabay')
            else licence.set('Pixabay')

            config?.onMultipleUpload?.([])
          })
        })
    } catch (error) {
      showToastNotice(imageStrings.pixabayUploadFailed, 'warning')
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  return (
    <div
      className="mx-auto rounded-md bg-yellow-50 p-8 shadow-md"
      data-qa="plugin-image-empty-wrapper"
    >
      <div className="mx-auto my-8 w-[60%]">
        {disableMediaUpload ? null : (
          <>
            <UploadButton
              config={config}
              src={src}
              onFocus={() => setIsAButtonFocused(true)}
              onBlur={() => setIsAButtonFocused(false)}
            />
            <PixabaySearch
              onFocus={() => setIsAButtonFocused(true)}
              onBlur={() => setIsAButtonFocused(false)}
              onSelectImage={onSelectPixabayImage}
            />
          </>
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
              if (config?.onMultipleUpload) {
                setTimeout(() => {
                  config?.onMultipleUpload?.([])
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
