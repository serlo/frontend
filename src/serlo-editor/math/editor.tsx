import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons'
import { faQuestionCircle, faXmark } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useState, createRef, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useHotkeys } from 'react-hotkeys-hook'
import { Key } from 'ts-key-enum'

import { MathHelpModal } from './math-help-modal'
import { MathRenderer } from './renderer'
import { MathEditorTextarea } from './textarea'
import { VisualEditor } from './visual-editor'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'

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
  closeMathEditorOverlay: () => void
  onMoveOutRight: () => void
  onMoveOutLeft(): void
  onDeleteOutRight?(): void
  onDeleteOutLeft?(): void
}

export function MathEditor(props: MathEditorProps) {
  const anchorRef = createRef<HTMLDivElement>()
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [hasError, setHasError] = useState(false)
  const targetRef = useRef<HTMLDivElement | null>(null)

  const mathStrings = useEditorStrings().plugins.text.math

  const { visual, readOnly, state, disableBlock } = props

  useHotkeys(
    Key.Escape,
    (event) => {
      event.preventDefault()
      props.closeMathEditorOverlay()
    },
    {
      enableOnFormTags: true,
    }
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      targetRef.current = document.querySelector<HTMLDivElement>(
        '.toolbar-controls-target'
      )

      if (!targetRef.current) {
        // eslint-disable-next-line no-console
        console.warn(
          'MathEditor: Could not find toolbar-controls-target to create portal'
        )
      }
    }
  }, [])

  const isVisualMode = (visual && !hasError) || false

  return (
    <>
      <MathHelpModal isHelpOpen={isHelpOpen} setIsHelpOpen={setIsHelpOpen} />
      {renderChildren()}
    </>
  )

  function renderChildren() {
    if (readOnly) {
      return state ? (
        <MathRenderer {...props} />
      ) : (
        <span
          className="bg-gray-300"
          {...props.additionalContainerProps}
          data-qa="plugin-math-renderer"
        >
          {mathStrings.formula}
        </span>
      )
    }

    return (
      <>
        {isVisualMode ? (
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
          <div
            className={clsx(
              props.inline ? 'inline-block' : '',
              'rounded-md bg-editor-primary-200'
            )}
          >
            <MathRenderer {...props} ref={anchorRef} />
          </div>
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
              value={isVisualMode ? 'visual' : 'latex'}
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
            {isVisualMode && (
              <button
                onMouseDown={() => void setIsHelpOpen(true)}
                className="mx-2 text-almost-black hover:text-editor-primary"
              >
                <FaIcon icon={faQuestionCircle} />
              </button>
            )}
          </div>
        )}

        {hasError || !isVisualMode ? (
          <MathEditorOverlayPortal
            hasError={hasError}
            isVisualMode={isVisualMode}
            {...props}
          />
        ) : null}
      </>
    )
  }

  function renderControlsPortal(children: JSX.Element) {
    if (!targetRef.current) return null
    return createPortal(children, targetRef.current)
  }
}

function MathEditorOverlayPortal({
  hasError,
  isVisualMode,
  ...props
}: { hasError: boolean; isVisualMode: boolean } & MathEditorProps) {
  const mathStrings = useEditorStrings().plugins.text.math
  const { state } = props

  return (
    <div
      className="fixed bottom-0 z-50 rounded-t-xl bg-editor-primary-100 p-3 shadow-menu"
      // Stops double/triple clicks inside the textArea field / modal to close
      // the overlay (see #2700)
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between">
        <p className="mr-0.5 mt-1 text-right text-sm font-bold text-gray-600">
          {hasError ? mathStrings.onlyLatex : mathStrings.latexEditorTitle}
        </p>
        <button
          onClick={props.closeMathEditorOverlay}
          className="mr-0.5 mt-1 text-sm font-bold text-gray-600 hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700"
          aria-label="Close math formula editor"
          data-qa="plugin-math-close-formula-editor"
        >
          <FaIcon icon={faXmark} />
        </button>
      </div>
      {!isVisualMode && <MathEditorTextarea {...props} defaultValue={state} />}
    </div>
  )
}
