import { faImages } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { withReact } from 'slate-react'

import { ImageProps } from '.'
import { PrimaryControls, SettingsControls } from './controls'
import { ImageRenderer } from './renderer'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { PluginToolbar } from '@/serlo-editor/core/plugin-toolbar'
import { DefaultControls } from '@/serlo-editor/core/plugin-toolbar/dropdown/default-controls'
import { useFormattingOptions } from '@/serlo-editor/core/plugin-toolbar/text-controls/hooks/use-formatting-options'
import { PluginToolbarTextControls } from '@/serlo-editor/core/plugin-toolbar/text-controls/plugin-toolbar-text-controls'
import { TextEditorFormattingOption } from '@/serlo-editor/core/plugin-toolbar/text-controls/types'
import { isTempFile, usePendingFileUploader } from '@/serlo-editor/plugin'
import {
  store,
  selectHasFocusedChild,
  selectIsDocumentEmpty,
  selectIsFocused,
  useAppSelector,
} from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

const formattingOptions = [
  TextEditorFormattingOption.richText,
  TextEditorFormattingOption.links,
  TextEditorFormattingOption.math,
  TextEditorFormattingOption.code,
]

export function ImageEditor(props: ImageProps) {
  const [isCaptionEditorChanged, setIsCaptionEditorChanged] = useState(0)

  const { editable, focused, state, config, id } = props
  const imageStrings = useEditorStrings().plugins.image

  usePendingFileUploader(state.src, config.upload)

  const hasFocus = focused || selectHasFocusedChild(store.getState(), props.id)

  const src = state.src.value.toString()

  const isFailed = isTempFile(state.src.value) && state.src.value.failed
  const isLoading = isTempFile(state.src.value) && !state.src.value.loaded

  const textFormattingOptions = useFormattingOptions(formattingOptions)
  const { createTextEditor, toolbarControls } = textFormattingOptions
  const captionEditor = useMemo(
    () => createTextEditor(withReact(createEditor())),
    [createTextEditor]
  )

  const isCaptionFocused = useAppSelector((storeState) =>
    selectIsFocused(storeState, state.caption.defined ? state.caption.id : '')
  )

  useEffect(() => {
    if (editable && !state.caption.defined) {
      state.caption.create({ plugin: EditorPluginType.Text })
    }
  }, [editable, state.caption])

  return (
    <>
      {renderPluginToolbar()}
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

  function renderPluginToolbar() {
    if (!focused && !isCaptionFocused) return null

    return (
      <PluginToolbar
        pluginId={id}
        pluginType={EditorPluginType.Image}
        contentControls={
          <PluginToolbarTextControls
            controls={toolbarControls}
            editor={captionEditor}
          />
        }
        pluginControls={<DefaultControls pluginId={id} />}
      />
    )
  }

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

    const isCaptionEditorEmpty = selectIsDocumentEmpty(
      store.getState(),
      state.caption.id
    )
    if (!hasFocus && isCaptionEditorEmpty) return null

    return state.caption.render({
      config: {
        placeholder: imageStrings.captionPlaceholder,
        controls: {
          editor: captionEditor,
          textFormattingOptions,
          isChanged: isCaptionEditorChanged,
          onChange: setIsCaptionEditorChanged,
        },
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
