import { isTempFile } from '@editor/plugin'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

import type { ImageProps } from '..'
import { UploadButton } from '../controls/upload-button'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function ImageSelectionScreen(props: ImageProps) {
  const editorStrings = useEditorStrings()
  const { state } = props
  const { src } = state

  const imageStrings = editorStrings.plugins.image
  const disableFileUpload = props.config.disableFileUpload // HACK: Temporary solution to make image plugin available in Moodle & Chancenwerk integration with file upload disabled.

  const placeholder = !isTempFile(src.value)
    ? imageStrings.placeholderEmpty
    : !src.value.failed
      ? imageStrings.placeholderUploading
      : imageStrings.placeholderFailed

  return (
    <div className="mx-auto rounded-md bg-yellow-50 p-8 shadow-md">
      <div className="mx-auto my-8 w-[60%]">
        <UploadButton {...props} />
        {/* TODO: Before this goes to production, hide search button until functionality is added */}
        {!disableFileUpload && (
          <button className="mb-4 flex min-w-full flex-shrink-0 items-center justify-center rounded-lg bg-editor-primary-200 p-1 py-2 font-semibold text-gray-800 hover:bg-editor-primary-300">
            <span className="mr-2 inline-block">
              <FaIcon icon={faMagnifyingGlass} />
            </span>
            {imageStrings.searchOnline}
          </button>
        )}
        <span className="mb-1 flex w-full justify-center font-bold">
          {imageStrings.imageUrl}
        </span>
        <input
          placeholder={placeholder}
          value={!isTempFile(src.value) ? src.value : ''}
          disabled={isTempFile(src.value) && !src.value.failed}
          onChange={(e) => state.src.set(e.target.value)}
          className="w-full rounded-lg border-0 bg-yellow-100 px-4 py-2 text-gray-600"
          data-qa="plugin-image-src"
        />
      </div>
    </div>
  )
}
