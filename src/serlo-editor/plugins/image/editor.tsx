import { faImages } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'

import { ImageProps } from '.'
import { isTempFile, usePendingFileUploader } from '../../plugin'
import {
  store,
  selectIsDocumentEmpty,
  selectHasFocusedChild,
} from '../../store'
import { PrimaryControls, SettingsControls } from './controls'
import { ImageRenderer } from './renderer'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export function ImageEditor(props: ImageProps) {
  const { editable, focused, state, config } = props
  const imageStrings = useEditorStrings().plugins.image

  usePendingFileUploader(state.src, config.upload)

  const hasFocus = focused || selectHasFocusedChild(store.getState(), props.id)

  useEffect(() => {
    // not sure if this is still needed
    if (editable && !state.caption.defined) {
      state.caption.create({ plugin: EditorPluginType.Text })
    }
  }, [editable, state.caption])

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
    if (!hasFocus && selectIsDocumentEmpty(store.getState(), state.caption.id))
      return null
    return state.caption.render({
      config: {
        placeholder: imageStrings.captionPlaceholder,
      },
    })
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
