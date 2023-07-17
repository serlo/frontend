import { faImages } from '@fortawesome/free-solid-svg-icons'

import { ImageProps } from '.'
import { CaptionEditor } from './caption-editor'
import { PrimaryControls, SettingsControls } from './controls'
import { ImageRenderer } from './renderer'
import { isTempFile, usePendingFileUploader } from '../../plugin'
import { store, selectHasFocusedChild } from '../../store'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function ImageEditor(props: ImageProps) {
  const { focused, state, config } = props
  const imageStrings = useEditorStrings().plugins.image

  usePendingFileUploader(state.src, config.upload)

  const hasFocus = focused || selectHasFocusedChild(store.getState(), props.id)

  const src = state.src.value.toString()

  const isFailed = isTempFile(state.src.value) && state.src.value.failed
  const isLoading = isTempFile(state.src.value) && !state.src.value.loaded

  return (
    <>
      <ImageRenderer
        image={{
          src,
          href: state.link.defined ? state.link.href.value : undefined,
          alt: state.alt.defined ? state.alt.value : undefined,
          maxWidth: state.maxWidth.defined ? state.maxWidth.value : undefined,
        }}
        caption={renderCaption()}
        placeholder={renderPlaceholder()}
        forceNewTab
      />
      {hasFocus ? renderEditControls() : null}
    </>
  )

  function renderPlaceholder() {
    if (!isLoading && src.length) return null
    return (
      <div className="relative w-full rounded-lg bg-editor-primary-50 py-32 text-center">
        <FaIcon icon={faImages} className="text-7xl text-editor-primary-200" />
      </div>
    )
  }

  function renderCaption() {
    if (!state.caption.defined) return null
    if (!hasFocus && !state.caption.value) return null
    return (
      <div>
        <CaptionEditor focused={focused} />
      </div>
    )
  }

  function renderEditControls() {
    return (
      <>
        {isFailed ? (
          <div className="text-bold text-red-400">
            {imageStrings.failedUpload}
          </div>
        ) : null}
        <PrimaryControls {...props} />
        {props.renderIntoSettings(<SettingsControls {...props} />)}
      </>
    )
  }
}
