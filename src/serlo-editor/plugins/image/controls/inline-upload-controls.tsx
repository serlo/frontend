import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'

import { UploadButton } from './upload-button'
import { ImageProps } from '..'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'
import { isTempFile } from '@/serlo-editor/plugin'

export function InlineUploadControls({ config, state }: ImageProps) {
  const imageStrings = useEditorStrings().plugins.image
  const { src } = state

  const placeholder = !isTempFile(src.value)
    ? imageStrings.placeholderEmpty
    : !src.value.failed
    ? imageStrings.placeholderUploading
    : imageStrings.placeholderFailed

  return (
    <p className="mx-side flex flex-wrap text-base">
      <label>
        <b>{imageStrings.imageUrl}</b>
        <input
          placeholder={placeholder}
          value={!isTempFile(src.value) ? src.value : ''}
          disabled={isTempFile(src.value) && !src.value.failed}
          onChange={(e) => state.src.set(e.target.value)}
          className={tw`
            mb-side mr-2 block w-60 rounded-xl border-2 border-editor-primary-100 bg-editor-primary-100
            px-2.5 py-[3px] text-almost-black focus:border-editor-primary focus:outline-none
          `}
        />
      </label>

      {isTempFile(src.value) && src.value.failed ? (
        <button
          className="serlo-button-editor-primary"
          onClick={() => {
            if (isTempFile(src.value) && src.value.failed) {
              void src.upload(src.value.failed, config.upload)
            }
          }}
        >
          <FaIcon icon={faRedoAlt} />
        </button>
      ) : null}
      <UploadButton onFile={(file) => src.upload(file, config.upload)} />
    </p>
  )
}
