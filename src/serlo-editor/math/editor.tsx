import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useState, useCallback, createRef, useEffect } from 'react'
import Modal from 'react-modal'

import { Button } from './button'
import { Dropdown, Option } from './dropdown'
import { InlineCheckbox } from './inline-checkbox'
import { MathRenderer } from './renderer'
import { VisualEditor } from './visual-editor'
import { EditorTextarea, HoverOverlayOld } from '../editor-ui'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

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

  const mathStrings = useEditorStrings().plugins.text.math

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
            {mathStrings.fraction}: {renderKey('/')}
          </p>
          <p>
            {mathStrings.superscript}: {renderKey('↑')} {mathStrings.or}{' '}
            {renderKey('^')}
          </p>
          <p>
            {mathStrings.subscript}: {renderKey('↓')} {mathStrings.or}{' '}
            {renderKey('_')}
          </p>
          <p>
            π, α, β, γ: {renderKey('pi')}, {renderKey('alpha')},{' '}
            {renderKey('beta')},{renderKey('gamma')}
          </p>
          <p>
            ≤, ≥: {renderKey('<=')}, {renderKey('>=')}
          </p>
          <p>
            {mathStrings.root}: {renderKey('\\sqrt')}, {renderKey('\\nthroot')}
          </p>
          <p>
            {mathStrings.mathSymbols}: {renderKey('\\<NAME>')}, {mathStrings.eG}{' '}
            {renderKey('\\neq')} (≠), {renderKey('\\pm')} (±), …
          </p>
          <p>
            {mathStrings.functions}: {renderKey('sin')}, {renderKey('cos')},{' '}
            {renderKey('ln')}, …
          </p>
        </>
      </Modal>
      {renderChildren()}
    </>
  )

  function renderKey(text: string) {
    return (
      <span className="min-w-[20px] rounded-md bg-[#ddd] px-1 py-0.5 text-center text-almost-black">
        {text}
      </span>
    )
  }

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
          <div
            onClick={(e) => {
              e.stopPropagation()
            }}
            ref={anchorRef}
            {...props.additionalContainerProps}
            className={clsx(
              props.inline
                ? 'inline-block'
                : 'my-[0.9em] flex flex-col items-center'
            )}
          >
            <VisualEditor
              {...props}
              onError={() => {
                setHasError(true)
              }}
            />
          </div>
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
                  <FaIcon icon={faQuestionCircle} />
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
