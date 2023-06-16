import { faImages, faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'

import { ImageProps } from '.'
import {
  OverlayButton,
  OverlayCheckbox,
  OverlayInput,
  OverlayTextarea,
} from '../../core'
import {
  EditorButton,
  EditorInput,
  EditorInlineSettings,
} from '../../editor-ui'
import { isTempFile, usePendingFileUploader } from '../../plugin'
import {
  store,
  selectIsDocumentEmpty,
  selectHasFocusedChild,
} from '../../store'
import { styled } from '../../ui'
import { useImageConfig } from './config'
import { ImageRenderer } from './renderer'
import { Upload } from './upload'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { legacyEditorTheme } from '@/helper/colors'

const InputRow = styled.span({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
})

const OverlayButtonWrapper = styled.div({
  marginTop: '5px',
  textAlign: 'right',
})

const Failed = styled.div({
  fontWeight: 'bold',
  color: legacyEditorTheme.danger.background,
})

const Caption = styled.div({
  marginTop: '1rem',
  textAlign: 'center',
  fontStyle: 'italic',
})

export function ImageEditor(props: ImageProps) {
  const { editable, focused, state } = props
  const config = useImageConfig(props.config)
  usePendingFileUploader(state.src, config.upload)
  const editorStrings = useEditorStrings()

  const captionIsEmpty =
    !state.caption.defined ||
    selectIsDocumentEmpty(store.getState(), state.caption.id)
  const hasFocus = focused || selectHasFocusedChild(store.getState(), props.id)

  useEffect(() => {
    if (editable && !state.caption.defined) {
      state.caption.create({ plugin: 'text' })
    }
  }, [editable, state.caption])

  if (!editable) {
    return (
      <>
        {renderImage()}
        {captionIsEmpty ? null : renderCaption()}
      </>
    )
  }

  return (
    <>
      {renderImage()}
      {hasFocus ? (
        <>
          <EditorInlineSettings>
            <PrimaryControls {...props} config={config} />
          </EditorInlineSettings>
          {props.renderIntoSettings(
            <SettingsControls {...props} config={config} />
          )}
        </>
      ) : null}
      {!captionIsEmpty || hasFocus ? renderCaption() : null}
    </>
  )

  function renderImage() {
    return state.src.value === '' ||
      (isTempFile(state.src.value) && !state.src.value.loaded) ? (
      <div className="relative w-full py-12 text-center">
        <FaIcon
          icon={faImages}
          className="text-[5rem] text-editor-primary-200"
        />
        {isTempFile(state.src.value) && state.src.value.failed ? (
          <Failed>{editorStrings.image.failedUpload}</Failed>
        ) : null}
      </div>
    ) : (
      <ImageRenderer {...props} disableMouseEvents={editable} />
    )
  }

  function renderCaption() {
    if (!state.caption.defined) return null
    return (
      <Caption>
        {state.caption.render({
          config: { placeholder: editorStrings.image.captionPlaceholder },
        })}
      </Caption>
    )
  }
}

function PrimaryControls(props: ImageProps) {
  const config = useImageConfig(props.config)
  const editorStrings = useEditorStrings()
  const { src } = props.state
  return (
    <>
      <InputRow>
        <EditorInput
          label={editorStrings.image.imageUrl}
          placeholder={
            !isTempFile(src.value)
              ? editorStrings.image.placeholderEmpty
              : !src.value.failed
              ? editorStrings.image.placeholderUploading
              : editorStrings.image.placeholderFailed
          }
          value={!isTempFile(src.value) ? src.value : ''}
          disabled={isTempFile(src.value) && !src.value.failed}
          onChange={handleChange(props)('src')}
          width="70%"
          inputWidth="80%"
          ref={props.autofocusRef}
        />
        {isTempFile(src.value) && src.value.failed ? (
          <EditorButton
            onClick={() => {
              if (isTempFile(src.value) && src.value.failed) {
                void src.upload(src.value.failed, props.config.upload)
              }
            }}
          >
            <FaIcon icon={faRedoAlt} />
          </EditorButton>
        ) : null}
        <Upload
          config={config}
          onFile={(file) => {
            void src.upload(file, props.config.upload)
          }}
        />
      </InputRow>
      {renderAlternativeInput()}
    </>
  )

  function renderAlternativeInput() {
    switch (props.config.secondInput) {
      case 'link': {
        const { link } = props.state
        return (
          <EditorInput
            label={editorStrings.image.href}
            placeholder={editorStrings.image.hrefPlaceholder}
            value={link.defined ? link.href.value : ''}
            onChange={handleChange(props)('href')}
            width="90%"
            inputWidth="70%"
            ref={props.autofocusRef}
          />
        )
      }
      default:
        return null
    }
  }
}

function SettingsControls(props: ImageProps) {
  const { state } = props
  const config = useImageConfig(props.config)

  const editorStrings = useEditorStrings()

  return (
    <>
      <OverlayInput
        label={editorStrings.image.imageUrl}
        placeholder={
          !isTempFile(state.src.value)
            ? editorStrings.image.placeholderEmpty
            : !state.src.value.failed
            ? editorStrings.image.placeholderUploading
            : editorStrings.image.placeholderFailed
        }
        value={!isTempFile(state.src.value) ? state.src.value : ''}
        disabled={isTempFile(state.src.value) && !state.src.value.failed}
        onChange={handleChange(props)('src')}
      />
      <OverlayButtonWrapper>
        {isTempFile(state.src.value) && state.src.value.failed ? (
          <OverlayButton
            onClick={() => {
              if (isTempFile(state.src.value) && state.src.value.failed) {
                void state.src.upload(
                  state.src.value.failed,
                  props.config.upload
                )
              }
            }}
            label={editorStrings.image.retry}
          >
            <FaIcon icon={faRedoAlt} />
          </OverlayButton>
        ) : null}
        <Upload
          config={config}
          inOverlay
          onFile={(file) => {
            void state.src.upload(file, props.config.upload)
          }}
        />
      </OverlayButtonWrapper>
      <OverlayTextarea
        label={editorStrings.image.alt}
        placeholder={editorStrings.image.altPlaceholder}
        value={state.alt.defined ? state.alt.value : ''}
        onChange={handleChange(props)('description')}
      />

      <OverlayInput
        label={editorStrings.image.href}
        placeholder={editorStrings.image.hrefPlaceholder}
        type="text"
        value={state.link.defined ? state.link.href.value : ''}
        onChange={handleChange(props)('href')}
      />
      {state.link.defined && state.link.href.value ? (
        <>
          <OverlayCheckbox
            label={editorStrings.image.openInNewTab}
            checked={state.link.defined ? state.link.openInNewTab.value : false}
            onChange={handleTargetChange(props)}
          />
        </>
      ) : null}
      <OverlayInput
        label={editorStrings.image.maxWidth}
        placeholder={editorStrings.image.maxWidthPlaceholder}
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

function handleChange(props: ImageProps) {
  return function (name: 'src' | 'description' | 'href') {
    return (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const { state } = props
      const value = event.target.value

      switch (name) {
        case 'src':
          state.src.set(value)
          break
        case 'description': {
          if (state.alt.defined) {
            if (value) {
              state.alt.set(value)
            } else {
              state.alt.remove()
            }
          } else {
            state.alt.create(value)
          }
          break
        }
        case 'href': {
          if (state.link.defined) {
            if (value) {
              state.link.href.set(value)
            } else {
              state.link.remove()
            }
          } else {
            state.link.create({
              href: value,
              openInNewTab: false,
            })
          }
          break
        }
      }
    }
  }
}

function handleTargetChange(props: ImageProps) {
  return function (checked: boolean) {
    const { state } = props
    if (checked) {
      if (state.link.defined) {
        state.link.openInNewTab.set(true)
      } else {
        state.link.create({
          href: '',
          openInNewTab: true,
        })
      }
    } else {
      if (state.link.defined) {
        state.link.openInNewTab.set(false)
      } else {
        state.link.create({
          href: '',
          openInNewTab: false,
        })
      }
    }
  }
}
