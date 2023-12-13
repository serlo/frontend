import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { TempFile, isTempFile } from '@editor/plugin'
import { faCircleArrowUp, faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'

import type { ImageProps } from '..'

export function UploadButton({ config, state }: ImageProps) {
  const { src } = state
  const imageStrings = useEditorStrings().plugins.image
  const isFailed = isTempFile(src.value) && src.value.failed

  return (
    <>
      <label
        className={cn(`
          mr-2 cursor-pointer rounded-md border border-gray-500
          px-1 text-sm transition-all focus-within:bg-editor-primary-200 hover:bg-editor-primary-200
          focus-visible:bg-editor-primary-200
        `)}
      >
        {imageStrings.upload} <FaIcon icon={faCircleArrowUp} />
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={({ target }) => {
            if (target.files && target.files.length) {
              void src.upload(target.files[0], config.upload)
            }
          }}
          data-qa="plugin-image-upload"
        />
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
