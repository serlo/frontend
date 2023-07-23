import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'

import { UploadButton } from './upload-button'
import { ImageProps } from '..'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'
import { isTempFile } from '@/serlo-editor/plugin'
import { OverlayInput } from '@/serlo-editor/plugin/plugin-toolbar'

export function SettingsModalControls({ state, config }: ImageProps) {
  const { link, alt, src, maxWidth } = state
  const imageStrings = useEditorStrings().plugins.image

  const isTemp = isTempFile(src.value)
  const isFailed = isTempFile(src.value) && src.value.failed

  return (
    <>
      <OverlayInput
        label={imageStrings.imageUrl}
        placeholder={
          !isTemp
            ? imageStrings.placeholderEmpty
            : isFailed
            ? imageStrings.placeholderFailed
            : imageStrings.placeholderUploading
        }
        value={isTemp ? '' : src.value.toString()}
        disabled={isTemp && !isFailed}
        onChange={(e) => src.set(e.target.value)}
      />
      <div className="mt-1 text-right">
        {isFailed ? (
          <button
            className="serlo-button-editor-secondary serlo-tooltip-trigger"
            onClick={() => {
              if (isTempFile(src.value) && src.value.failed) {
                void src.upload(src.value.failed, config.upload)
              }
            }}
          >
            <EditorTooltip text={imageStrings.retry} />
            <FaIcon icon={faRedoAlt} />
          </button>
        ) : null}
        <UploadButton onFile={(file) => src.upload(file, config.upload)} />
      </div>
      <label className="mx-auto mb-0 mt-5 flex flex-row justify-between">
        <span className="w-[20%]">{imageStrings.alt}</span>
        <textarea
          placeholder={imageStrings.altPlaceholder}
          value={alt.defined ? alt.value : ''}
          onChange={({ target }) => {
            const { value } = target
            if (alt.defined) {
              if (value) alt.set(value)
              else alt.remove()
            } else alt.create(value)
          }}
          className={tw`
            serlo-input-font-reset
            mt-1.5 min-h-[100px] w-3/4 resize-none rounded-md
            border-2 border-editor-primary-100  bg-editor-primary-100 p-2.5 
            focus:border-editor-primary-300 focus:outline-none
          `}
        />
      </label>
      <OverlayInput
        label={imageStrings.href}
        placeholder={imageStrings.hrefPlaceholder}
        type="text"
        value={link.defined ? link.href.value : ''}
        onChange={(e) => {
          const newHref = e.target.value
          if (link.defined) {
            if (newHref) link.href.set(newHref)
            else link.remove()
          } else link.create({ href: newHref })
        }}
      />
      <OverlayInput
        label={imageStrings.maxWidth}
        placeholder={imageStrings.maxWidthPlaceholder}
        type="number"
        value={maxWidth.defined ? maxWidth.value : ''}
        onChange={(event) => {
          const value = parseInt(event.target.value)
          if (maxWidth.defined) {
            maxWidth.set(value)
          } else {
            maxWidth.create(value)
          }
        }}
      />
    </>
  )
}
