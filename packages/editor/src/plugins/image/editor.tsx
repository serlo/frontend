import { FaIcon } from '@editor/editor-ui/fa-icon'
import { TextEditorFormattingOption } from '@editor/editor-ui/plugin-toolbar/text-controls/types'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { isTempFile, usePendingFileUploader } from '@editor/plugin'
import { selectIsFocused, useAppSelector } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { cn } from '@editor/utils/cn'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'

import type { ImageProps } from '.'
import { ImageSelectionScreen } from './components/image-selection-screen'
import { ImageRenderer } from './renderer'
import { ImageToolbar } from './toolbar'
import { isImageUrl } from './utils/check-image-url'

const captionFormattingOptions = [
  TextEditorFormattingOption.richTextBold,
  TextEditorFormattingOption.links,
  TextEditorFormattingOption.math,
  TextEditorFormattingOption.code,
]

export function ImageEditor(props: ImageProps) {
  const { id, focused, state, config } = props
  const imageStrings = useEditStrings().plugins.image

  const [showInlineImageUrl, setShowInlineImageUrl] = useState(!state.src.value)

  usePendingFileUploader(state.src, config.upload)

  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const src = state.src.value.toString()

  const hasValidUrl = isImageUrl(src)

  const toolbarTitle =
    config.onMultipleUpload && !hasValidUrl
      ? imageStrings.galleryTitle
      : undefined

  const isCaptionFocused = useAppSelector((storeState) =>
    state.caption.defined
      ? selectIsFocused(storeState, state.caption.id)
      : false
  )
  const [isAButtonFocused, setIsAButtonFocused] = useState(false)

  const hasFocus =
    focused ||
    isCaptionFocused ||
    (isAButtonFocused && !hasValidUrl) ||
    config.onMultipleUpload

  const isLoading = isTempFile(state.src.value) && !state.src.value.loaded

  const urlInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!state.caption.defined) {
      state.caption.create({ plugin: EditorPluginType.Text })
    }
  }, [state.caption])

  useEffect(() => {
    setShowInlineImageUrl(!state.src.value)
    // updatating when src changes could hide input while you are typing so:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused])

  useEffect(() => {
    // manually set focus to url after creating plugin
    if (focused) {
      setTimeout(() => {
        urlInputRef.current?.focus()
      })
    }
    // only on first mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleChangeImageButtonClick() {
    state.src.set('')
    state.alt.defined && state.alt.remove()
    state.caption.defined && state.caption.remove()
    state.link.defined && state.link.remove()
  }

  return (
    <>
      {hasFocus ? (
        <ImageToolbar
          id={id}
          state={state}
          title={toolbarTitle}
          showSettingsButtons={hasValidUrl}
          onChangeImageButtonClick={handleChangeImageButtonClick}
        />
      ) : null}

      <div
        className={cn(
          'z-[2] [&_img]:min-h-[4rem]',
          hasFocus && showInlineImageUrl ? 'relative' : ''
        )}
        data-qa="plugin-image-editor"
      >
        {hasValidUrl ? (
          <ImageRenderer
            image={{
              src,
              href: state.link.defined ? state.link.href.value : undefined,
              alt: state.alt.defined ? state.alt.value : undefined,
              maxWidth: state.maxWidth.defined
                ? state.maxWidth.value
                : undefined,
            }}
            caption={renderCaption()}
            placeholder={renderPlaceholder()}
            forceNewTab
          />
        ) : (
          <ImageSelectionScreen
            config={config}
            state={state}
            setIsAButtonFocused={setIsAButtonFocused}
            urlInputRef={urlInputRef}
          />
        )}
      </div>
    </>
  )

  function renderPlaceholder() {
    if (!isLoading && src.length) return null
    return (
      <div
        className="relative w-full rounded-lg bg-editor-primary-50 px-side py-32 text-center"
        data-qa="plugin-image-placeholder"
      >
        <FaIcon
          icon={faImages}
          className="mb-4 text-7xl text-editor-primary-200"
        />
      </div>
    )
  }

  function renderCaption() {
    if (!state.caption.defined) return null

    return state.caption.render({
      config: {
        placeholder: imageStrings.captionPlaceholder,
        formattingOptions: captionFormattingOptions,
        isInlineChildEditor: true,
      },
    })
  }
}
