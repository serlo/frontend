import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { TempFile, isTempFile } from '@editor/plugin'
import { faRedoAlt, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

import type { ImageProps } from '..'

export function UploadButton({ config, state }: ImageProps) {
  const { src } = state
  const imageStrings = useEditorStrings().plugins.image
  const isFailed = isTempFile(src.value) && src.value.failed

  return (
    <>
      <label className="mb-4 flex w-full items-center justify-center rounded-lg bg-editor-primary-200 py-2 font-semibold text-gray-800 hover:bg-editor-primary-300">
        <span className="mr-2 inline-block">
          <FaIcon icon={faUpload} />
        </span>
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
        {imageStrings.upload}
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
