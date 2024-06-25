import { isTempFile } from '@editor/plugin'
import { faMagnifyingGlass, faUpload } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

import type { ImageProps } from './index.js'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { UploadButton } from './controls/upload-button'

export function ImageSelectionScreen(props: ImageProps) {
  const editorStrings = useEditorStrings()
  const { config, state } = props
  const { src } = state

  const imageStrings = editorStrings.plugins.image

  const placeholder = !isTempFile(src.value)
    ? imageStrings.placeholderEmpty
    : !src.value.failed
      ? imageStrings.placeholderUploading
      : imageStrings.placeholderFailed

  return (
    <div className="mx-auto rounded-md bg-yellow-50 p-8 shadow-md">
      <div className="mx-auto my-8 w-[60%]">
        <UploadButton {...props} />
        <button className="mb-4 flex w-full items-center justify-center rounded-lg bg-editor-primary-200 py-2 font-semibold text-gray-800 hover:bg-editor-primary-300">
          <span className="mr-2 inline-block">
            <FaIcon icon={faMagnifyingGlass} />
          </span>
          {imageStrings.searchOnline}
        </button>
        <span className="mb-1 flex w-full justify-center font-bold">
          {imageStrings.imageUrl}
        </span>
        <input
          placeholder={placeholder}
          value={!isTempFile(src.value) ? src.value : ''}
          disabled={isTempFile(src.value) && !src.value.failed}
          onChange={(e) => state.src.set(e.target.value)}
          className="w-full rounded-lg  border-0 bg-yellow-100 px-4 py-2 text-gray-600"
          data-qa="plugin-image-src"
        />
      </div>
    </div>
  )
}
