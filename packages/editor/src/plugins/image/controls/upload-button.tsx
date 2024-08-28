import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { TempFile, isTempFile } from '@editor/plugin'
import {
  faArrowUpFromBracket,
  faRedoAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { useState } from 'react'

import type { ImageProps } from '..'
import { cn } from '@/helper/cn'
import { showToastNotice } from '@/helper/show-toast-notice'

interface UploadButtonProps {
  config: ImageProps['config']
  state: ImageProps['state']
  onFocus?: () => void
  onBlur?: () => void
}

export function UploadButton({
  config,
  state,
  onFocus,
  onBlur,
}: UploadButtonProps) {
  const { src } = state
  const imageStrings = useEditorStrings().plugins.image
  const isFailed = isTempFile(src.value) && src.value.failed

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
          multiple={!!config.onMultipleUpload}
          accept="image/*"
          className="sr-only"
          onChange={({ target }) => {
            if (target.files && target.files.length) {
              const filesArray = Array.from(target.files)

              if (target.files.length > 8) {
                showToastNotice(imageStrings.tooManyImagesError, 'warning')
                return
              }

              // Upload the first file like normal
              void src.upload(filesArray[0], config.upload)

              // If multiple files are allowed and more than one file is selected,
              // call the onMultipleUpload callback with the remaining files
              config.onMultipleUpload?.(filesArray.slice(1))
            }
          }}
          data-qa="plugin-image-upload"
        />
        {!config.onMultipleUpload
          ? imageStrings.upload
          : imageStrings.uploadMultiple}
      </label>

      {isFailed ? (
        <button
          className="serlo-button-editor-primary serlo-tooltip-trigger mr-2 scale-90"
          onClick={() =>
            src.upload((src.value as TempFile).failed!, config.upload)
          }
          data-qa="plugin-image-retry"
        >
          <EditorTooltip text={imageStrings.retry} className="top-10" />
          <FaIcon icon={faRedoAlt} />
        </button>
      ) : null}
    </>
  )
}
