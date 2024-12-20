import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { TempFile, isTempFile } from '@editor/plugin'
import { useUploadFile } from '@editor/plugins/image/utils/upload-file'
import { cn } from '@editor/utils/cn'
import {
  faArrowUpFromBracket,
  faRedoAlt,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import type { VideoProps } from '..'

interface UploadButtonProps {
  src: VideoProps['state']['src']
  onFocus?: () => void
  onBlur?: () => void
}

export function UploadButton({ src, onFocus, onBlur }: UploadButtonProps) {
  const uploadStrings = useEditStrings().edtrIo.fileUpload
  const videoStrings = useEditStrings().plugins.video
  const isFailed = isTempFile(src.value) && src.value.failed

  const upload = useUploadFile()

  const [isLabelFocused, setIsLabelFocused] = useState(false)

  return (
    <>
      <label
        onFocus={(e) => {
          e.stopPropagation()
          setIsLabelFocused(true)
          onFocus?.()
        }}
        onBlur={(e) => {
          e.stopPropagation()
          setIsLabelFocused(false)
          onBlur?.()
        }}
        className={cn(
          'mb-4 flex w-full py-2',
          'items-center justify-center',
          'cursor-pointer rounded-lg',
          'font-semibold text-gray-800',
          'bg-editor-primary-200 hover:bg-editor-primary-300',
          isLabelFocused ? 'outline outline-2 outline-brand' : ''
        )}
      >
        <span className="almost-black mr-2 inline-block">
          <FaIcon icon={faArrowUpFromBracket} />
        </span>
        <input
          type="file"
          accept="video/mp4,video/webm,.mp4,.webm"
          className="sr-only"
          onChange={({ target }) => {
            if (target.files && target.files.length) {
              void src.upload(target.files[0], upload)
            }
          }}
          data-qa="plugin-video-upload"
        />
        {videoStrings.upload}
      </label>

      {isFailed ? (
        <button
          className="serlo-button-edit-primary serlo-tooltip-trigger mr-2 scale-90"
          onClick={() => src.upload((src.value as TempFile).failed!, upload)}
          data-qa="plugin-video-retry"
        >
          <EditorTooltip text={uploadStrings.retry} className="top-10" />
          <FaIcon icon={faRedoAlt} />
        </button>
      ) : null}
    </>
  )
}
