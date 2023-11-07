import { faImages } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

import type { ImageProps } from '.'
import { InlineSrcControls } from './controls/inline-src-controls'
import { ImageRenderer } from './renderer'
import { ImageToolbar } from './toolbar'
import { TextEditorConfig } from '../text'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { TextEditorFormattingOption } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/types'
import { isTempFile, usePendingFileUploader } from '@/serlo-editor/plugin'
import { selectIsFocused, useAppSelector } from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

const captionFormattingOptions = [
  TextEditorFormattingOption.richTextBold,
  TextEditorFormattingOption.links,
  TextEditorFormattingOption.math,
  TextEditorFormattingOption.code,
]

export function ImageEditor(props: ImageProps) {
  const { editable, focused, state, config } = props
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
    if (editable && !state.caption.defined) {
      state.caption.create({ plugin: EditorPluginType.Text })
    }
  }, [editable, state.caption])

  useEffect(() => {
    setShowInlineImageUrl(!state.src.value)
    // updatating when src changes could hide input while you are typing so:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editable, focused])

  useEffect(() => {
    // manually set focus to url after creating plugin
    if (editable && focused) {
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
          showSettingsModal={showSettingsModal}
          setShowSettingsModal={setShowSettingsModal}
        />
      ) : null}

      <div
        className={clsx(
          'z-[2] [&_img]:min-h-[4rem]',
          hasFocus && showInlineImageUrl ? 'relative' : ''
        )}
        data-qa="plugin-image-editor"
      >
        {hasFocus && showInlineImageUrl ? (
          <div className="absolute left-side top-side z-[3]">
            <InlineSrcControls {...props} urlInputRef={urlInputRef} />
          </div>
        ) : null}

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
