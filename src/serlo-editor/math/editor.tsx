import { useState, useCallback, createRef, useEffect } from 'react'
import Modal from 'react-modal'

import { EditorTextarea, HoverOverlayOld, styled } from '../editor-ui'
import { faQuestionCircle, Icon } from '../ui'
import { Button } from './button'
import { Dropdown, Option } from './dropdown'
import { InlineCheckbox } from './inline-checkbox'
import { MathRenderer } from './renderer'
import { VisualEditor } from './visual-editor'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

const EditorWrapper = styled.div<{ inline?: boolean }>((props) => {
  return {
    whiteSpace: undefined,
    overflowWrap: undefined,
    ...(props.inline
      ? {
          display: 'inline-block',
        }
      : {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '0.9em',
          marginBottom: '0.9em',
        }),
  }
})

const mathEditorTextareaStyle = {
  color: 'black',
  margin: 2,
  width: '80vw',
  maxWidth: 600,
}

interface MathEditorTextAreaProps
  extends Pick<
    MathEditorProps,
    'onChange' | 'onMoveOutLeft' | 'onMoveOutRight'
  > {
  defaultValue: string
  onChange: (value: string) => void
}

const MathEditorTextArea = (props: MathEditorTextAreaProps) => {
  const [latex, setLatex] = useState(props.defaultValue)
  const { onChange } = props
  const parentOnChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value
      setLatex(value)
      onChange(value)
    },
    [onChange]
  )

  // Autofocus textarea
  const textareaRef = createRef<HTMLTextAreaElement>()
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea)
      // Timeout is needed because hovering overlay is positioned only after render of this
      setTimeout(() => {
        textarea.focus()
      })
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <EditorTextarea
      style={mathEditorTextareaStyle}
      onChange={parentOnChange}
      onCopy={(event: React.ClipboardEvent) => {
        event.stopPropagation()
      }}
      onCut={(event: React.ClipboardEvent) => {
        event.stopPropagation()
      }}
      onMoveOutRight={props.onMoveOutRight}
      onMoveOutLeft={props.onMoveOutLeft}
      value={latex}
      ref={textareaRef}
    />
  )
}

const KeySpan = styled.span({
  background: '#ddd',
  padding: '2px 4px',
  borderRadius: 5,
  color: '#1d1c1d',
  textAlign: 'center',
  minWidth: 20,
})

export interface MathEditorProps {
  autofocus?: boolean
  state: string
  inline?: boolean
  readOnly?: boolean
  visual?: boolean
  disableBlock?: boolean
  additionalContainerProps?: Record<string, unknown>
  onEditorChange(visual: boolean): void
  onInlineChange?(inline: boolean): void
  onChange(state: string): void
  onMoveOutRight?(): void
  onMoveOutLeft?(): void
  onDeleteOutRight?(): void
  onDeleteOutLeft?(): void
}

export function MathEditor(props: MathEditorProps) {
  const anchorRef = createRef<HTMLDivElement>()
  const [helpOpen, setHelpOpen] = useState(false)
  const [hasError, setHasError] = useState(false)

  const mathStrings = useLoggedInData()!.strings.editor.text.math

  const { visual, readOnly, state, disableBlock } = props

  const useVisualEditor = visual && !hasError

  return (
    <>
      <Modal
        ariaHideApp={false}
        isOpen={helpOpen}
        onRequestClose={() => {
          setHelpOpen(false)
        }}
        style={{
          overlay: {
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          },
          content: {
            borderRadius: 0,
            backgroundColor: '#ffffff',
            width: '90%',
            maxWidth: '600px',
            maxHeight: 'calc(100vh - 80px)',
            top: 'auto',
            left: 'auto',
            right: 'auto',
            bottom: 'auto',
            margin: '0 auto',
          },
        }}
      >
        <>
          {mathStrings.shortcuts}:
          <br />
          <br />
          <p>
            {mathStrings.fraction}: <KeySpan>/</KeySpan>
          </p>
          <p>
            {mathStrings.superscript}: <KeySpan>↑</KeySpan> {mathStrings.or}{' '}
            <KeySpan>^</KeySpan>
          </p>
          <p>
            {mathStrings.subscript}: <KeySpan>↓</KeySpan> {mathStrings.or}{' '}
            <KeySpan>_</KeySpan>
          </p>
          <p>
            π, α, β, γ: <KeySpan>pi</KeySpan>, <KeySpan>alpha</KeySpan>,{' '}
            <KeySpan>beta</KeySpan>,<KeySpan>gamma</KeySpan>
          </p>
          <p>
            ≤, ≥: <KeySpan>{'<='}</KeySpan>, <KeySpan>{'>='}</KeySpan>
          </p>
          <p>
            {mathStrings.root}: <KeySpan>\sqrt</KeySpan>,{' '}
            <KeySpan>\nthroot</KeySpan>
          </p>
          <p>
            {mathStrings.mathSymbols}: <KeySpan>{'\\<NAME>'}</KeySpan>,{' '}
            {mathStrings.eG} <KeySpan>\neq</KeySpan> (≠), <KeySpan>\pm</KeySpan>{' '}
            (±), ...
          </p>
          <p>
            {mathStrings.functions}: <KeySpan>sin</KeySpan>,{' '}
            <KeySpan>cos</KeySpan>, <KeySpan>ln</KeySpan>, ...
          </p>
        </>
      </Modal>
      {renderChildren()}
    </>
  )

  function renderChildren() {
    if (readOnly) {
      return state ? (
        <MathRenderer {...props} />
      ) : (
        <span className="bg-gray-300" {...props.additionalContainerProps}>
          {mathStrings.formula}
        </span>
      )
    }

    return (
      <>
        {useVisualEditor ? (
          <EditorWrapper
            onClick={(e) => {
              e.stopPropagation()
            }}
            inline={props.inline}
            ref={anchorRef}
            {...props.additionalContainerProps}
          >
            <VisualEditor
              {...props}
              onError={() => {
                setHasError(true)
              }}
            />
          </EditorWrapper>
        ) : (
          <MathRenderer {...props} ref={anchorRef} />
        )}
        {helpOpen ? null : (
          <HoverOverlayOld position="above" anchor={anchorRef}>
            <div
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <Dropdown
                value={useVisualEditor ? 'visual' : 'latex'}
                onChange={(e) => {
                  if (hasError) setHasError(false)
                  props.onEditorChange(e.target.value === 'visual')
                }}
              >
                <Option active={useVisualEditor} value="visual">
                  {mathStrings.visual}
                </Option>
                <Option active={!useVisualEditor} value="latex">
                  {mathStrings.latex}
                </Option>
              </Dropdown>
              {!disableBlock && (
                <InlineCheckbox
                  label={mathStrings.displayAsBlock}
                  checked={!props.inline}
                  onChange={(checked) => {
                    if (typeof props.onInlineChange === 'function') {
                      props.onInlineChange(!checked)
                    }
                  }}
                />
              )}
              {useVisualEditor && (
                <Button onMouseDown={() => setHelpOpen(true)}>
                  <Icon icon={faQuestionCircle} />
                </Button>
              )}
              {hasError && (
                <>
                  {mathStrings.onlyLatex}
                  &nbsp;&nbsp;
                </>
              )}
              <br />
              {!useVisualEditor && (
                <MathEditorTextArea {...props} defaultValue={state} />
              )}
            </div>
          </HoverOverlayOld>
        )}
      </>
    )
  }
}
