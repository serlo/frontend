/* eslint-disable @typescript-eslint/no-unused-vars */
import { TextEditorFormattingOption } from '@editor/editor-ui/plugin-toolbar/text-controls/types'
import { isTempFile, usePendingFileUploader } from '@editor/plugin'
import { selectIsFocused, useAppSelector } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'
import { useEffect, useRef, useState } from 'react'

import type { ImageProps } from '.'
import { InlineSrcControls } from './controls/inline-src-controls'
import { ImageSelectionScreen } from './image-selection-screen'
import { ImageRenderer } from './renderer'
import { ImageToolbar } from './toolbar'
import { TextEditorConfig } from '../text'

const captionFormattingOptions = [
  TextEditorFormattingOption.richTextBold,
  TextEditorFormattingOption.links,
  TextEditorFormattingOption.math,
  TextEditorFormattingOption.code,
]

export function ImageEditor(props: ImageProps) {
  const { focused, state, config } = props
  const imageStrings = useEditorStrings().plugins.image

  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showInlineImageUrl, setShowInlineImageUrl] = useState(!state.src.value)

  usePendingFileUploader(state.src, config.upload)

  const isCaptionFocused = useAppSelector((storeState) => {
    return state.caption.defined
      ? selectIsFocused(storeState, state.caption.id)
      : false
  })

  const hasFocus = focused || isCaptionFocused
  const isLoading = isTempFile(state.src.value) && !state.src.value.loaded

  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const src = state.src.value.toString()

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

  return (
    <>
      {hasFocus ? (
        <ImageToolbar
          {...props}
          onClickChangeImage={() => {
            state.src.set('')
          }}
          showSettingsButtons={src.length > 0}
          showSettingsModal={showSettingsModal}
          setShowSettingsModal={setShowSettingsModal}
        />
      ) : null}

      <div
        className={cn(
          'z-[2] [&_img]:min-h-[4rem]',
          hasFocus && showInlineImageUrl ? 'relative' : ''
        )}
        data-qa="plugin-image-editor"
      >
        {src.length === 0 && <ImageSelectionScreen {...props} />}
        {src.length > 0 && (
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
            {...props}
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
      } as TextEditorConfig,
    })
  }
}
