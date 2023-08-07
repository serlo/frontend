import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useState, useCallback, createRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Modal from 'react-modal'

import { MathRenderer } from './renderer'
import { VisualEditor } from './visual-editor'
import { EditorTextarea } from '../editor-ui'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'

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
      className={tw`
        !m-0.5 h-24 !w-[80vw] !max-w-[600px] rounded-md !border-2
        border-transparent text-black !shadow-none focus:border-editor-primary
      `}
      onChange={parentOnChange}
      onCopy={(e) => e.stopPropagation()}
      onCut={(e) => e.stopPropagation()}
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
            onClick={(e) => e.stopPropagation()}
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

        {renderControlsPortal(
          <div
            onMouseDown={(e) => e.stopPropagation()} // stops editor from setting focus to other plugin
            className="inline-block"
          >
            <select
              className={tw`
                  ml-2 cursor-pointer rounded-md !border border-gray-500 bg-editor-primary-100
                  px-1 py-[2px] text-base text-almost-black transition-all
                hover:bg-editor-primary-200 focus:bg-editor-primary-200 focus:outline-none
                `}
              value={useVisualEditor ? 'visual' : 'latex'}
              onChange={(e) => {
                if (hasError) setHasError(false)
                props.onEditorChange(e.target.value === 'visual')
              }}
            >
              <option value="visual">{mathStrings.visual}</option>
              <option value="latex">{mathStrings.latex}</option>
            </select>
            {!disableBlock && (
              <button
                className="mx-2 rounded-md border border-gray-500 px-1 text-base text-almost-black transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
                onClick={() => {
                  if (props.onInlineChange) props.onInlineChange(!props.inline)
                }}
              >
                {mathStrings.displayAsBlock}{' '}
                <FaIcon icon={props.inline ? faCircle : faCheckCircle} />
              </button>
            )}
            {useVisualEditor && (
              <button
                onMouseDown={() => setHelpOpen(true)}
                className="mx-2 text-almost-black hover:text-editor-primary"
              >
                <FaIcon icon={faQuestionCircle} />
              </button>
            )}
          </div>
        )}

        {hasError || !useVisualEditor ? renderOverlayPortal() : null}
      </>
    )
  }

  function renderControlsPortal(children: JSX.Element) {
    const target =
      typeof window !== undefined &&
      document.querySelector('.toolbar-controls-target')
    if (!target) return null

    return createPortal(children, target)
  }

  function renderOverlayPortal() {
    const children = (
      <div
        className="fixed bottom-0 z-50 rounded-t-xl bg-editor-primary-100 p-3 shadow-menu"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mr-0.5 mt-1 text-right text-sm font-bold text-gray-600">
          {hasError ? mathStrings.onlyLatex : mathStrings.latexEditorTitle}
        </p>
        {!useVisualEditor && (
          <MathEditorTextArea {...props} defaultValue={state} />
        )}
      </div>
    )
    return children
  }
}
