import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'

import { ImageProps } from '.'
import { Upload } from './upload'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { EditorButton, EditorInput } from '@/serlo-editor/editor-ui'
import { isTempFile } from '@/serlo-editor/plugin'
import {
  OverlayButton,
  OverlayInput,
  OverlayTextarea,
} from '@/serlo-editor/plugin/plugin-toolbar'

export function PrimaryControls({ config, state, autofocusRef }: ImageProps) {
  const imageStrings = useEditorStrings().plugins.image
  const { src } = state

  const placeholder = !isTempFile(src.value)
    ? imageStrings.placeholderEmpty
    : !src.value.failed
    ? imageStrings.placeholderUploading
    : imageStrings.placeholderFailed

  return (
    <p className="mt-4 flex flex-row justify-between">
      <EditorInput
        label={imageStrings.imageUrl}
        placeholder={placeholder}
        value={!isTempFile(src.value) ? src.value : ''}
        disabled={isTempFile(src.value) && !src.value.failed}
        onChange={(e) => state.src.set(e.target.value)}
        width="70%"
        inputWidth="80%"
        ref={autofocusRef}
      />
      {isTempFile(src.value) && src.value.failed ? (
        <EditorButton
          onClick={() => {
            if (isTempFile(src.value) && src.value.failed) {
              void src.upload(src.value.failed, config.upload)
            }
          }}
        >
          <FaIcon icon={faRedoAlt} />
        </EditorButton>
      ) : null}
      <Upload onFile={(file) => src.upload(file, config.upload)} />
    </p>
  )
}

export function SettingsControls(props: ImageProps) {
  const { state, config } = props
  const { link, alt } = state
  const imageStrings = useEditorStrings().plugins.image

  const isTemp = isTempFile(state.src.value)
  const isFailed = isTempFile(state.src.value) && state.src.value.failed

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
        value={isTemp ? '' : state.src.value.toString()}
        disabled={isTemp && !isFailed}
        onChange={(e) => state.src.set(e.target.value)}
      />
      <div className="mt-1 text-right">
        {isFailed ? (
          <OverlayButton
            onClick={() => {
              if (isTempFile(state.src.value) && state.src.value.failed) {
                void state.src.upload(
                  state.src.value.failed,
                  props.config.upload
                )
              }
            }}
            label={imageStrings.retry}
          >
            <FaIcon icon={faRedoAlt} />
          </OverlayButton>
        ) : null}
        <Upload onFile={(file) => state.src.upload(file, config.upload)} />
      </div>
      <OverlayTextarea
        label={imageStrings.alt}
        placeholder={imageStrings.altPlaceholder}
        value={state.alt.defined ? state.alt.value : ''}
        onChange={({ target }) => {
          const { value } = target
          if (alt.defined) {
            if (value) alt.set(value)
            else alt.remove()
          } else alt.create(value)
        }}
      />
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
        value={state.maxWidth.defined ? state.maxWidth.value : ''}
        onChange={(event) => {
          const value = parseInt(event.target.value)
          if (state.maxWidth.defined) {
            state.maxWidth.set(value)
          } else {
            state.maxWidth.create(value)
          }
        }}
      />
    </>
  )
}
