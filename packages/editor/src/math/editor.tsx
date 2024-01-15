import { ToolbarSelect } from '@editor/editor-ui/plugin-toolbar/components/toolbar-select'
import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useHotkeys } from 'react-hotkeys-hook'
import { Key } from 'ts-key-enum'

import { MathEditorOverlay } from './math-editor-overlay'
import { MathHelpModal } from './math-help-modal'
import { VisualEditor } from './visual-editor'
import { StaticMath } from '../plugins/text/static-components/static-math'

export interface MathEditorProps {
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
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [hasError, setHasError] = useState(false)

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
        <StaticMath type="math" src={props.state} inline={!!props.inline} />
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
            {...props.additionalContainerProps}
            className={cn(
              props.inline
                ? 'inline-block'
                : 'my-[1.45em] flex flex-col items-center'
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
            className={cn(
              props.inline ? 'inline-block' : '',
              'rounded-md bg-editor-primary-200'
            )}
          >
            <StaticMath type="math" src={props.state} inline={!!props.inline} />
          </div>
        )}

        {renderControlsPortal(
          <div
            onMouseDown={(e) => e.stopPropagation()} // stops editor from setting focus to other plugin
            className="ml-3 inline-block"
          >
            <ToolbarSelect
              tooltipText=""
              value={isVisualMode ? 'visual' : 'latex'}
              data-qa="plugin-toolbar-math-type-switch"
              changeValue={(value) => {
                if (hasError) setHasError(false)
                props.onEditorChange(value === 'visual')
              }}
              options={[
                { value: 'visual', text: mathStrings.visual },
                { value: 'latex', text: mathStrings.latex },
              ]}
            />

            {!disableBlock && (
              <button
                className="mr-2 rounded-md border border-gray-500 px-1 py-0.25 text-sm text-almost-black transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
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
          <MathEditorOverlay
            hasError={hasError}
            isVisualMode={isVisualMode}
            {...props}
          />
        ) : null}
      </>
    )
  }

  function renderControlsPortal(children: JSX.Element) {
    return createPortal(
      children,
      document.querySelector<HTMLDivElement>('.toolbar-controls-target') ??
        document.body
    )
  }
}
