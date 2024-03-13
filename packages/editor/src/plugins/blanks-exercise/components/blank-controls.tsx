import { AutogrowInput } from '@editor/editor-ui/autogrow-input'
import {
  getBlankElement,
  isBlankActive,
} from '@editor/editor-ui/plugin-toolbar/text-controls/utils/blank'
import { RemovableInputWrapper } from '@editor/editor-ui/removable-input-wrapper'
import { SlateOverlay } from '@editor/editor-ui/slate-overlay'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { faCheckSquare, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState, useMemo } from 'react'
import { Range } from 'slate'
import { useSlate } from 'slate-react'

import type { BlankInterface as Blank } from '../types'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

const wrapperWidth = 320

interface BlankControlsProps {
  blankId: string
  correctAnswers: string[]
  acceptMathEquivalents?: boolean
  onAlternativeAnswerAdd: () => void
  onAlternativeAnswerChange: (targetIndex: number, newValue: string) => void
  onAlternativeAnswerRemove: (targetIndex: number) => void
  onAcceptMathEquivalentsChange: () => void
}

export function BlankControls(props: BlankControlsProps) {
  const {
    blankId,
    correctAnswers,
    acceptMathEquivalents,
    onAlternativeAnswerAdd,
    onAlternativeAnswerChange,
    onAlternativeAnswerRemove,
    onAcceptMathEquivalentsChange,
  } = props
  const [selectedElement, setSelectedElement] = useState<Blank | null>(null)

  const editor = useSlate()
  const { selection } = editor

  const inputsWrapper = useRef<HTMLInputElement>(null)

  const blanksExerciseStrings = useEditorStrings().plugins.blanksExercise

  // Setting the element to serve as an anchor for overlay positioning
  useEffect(() => {
    if (!selection) return

    const isCollapsed = selection && Range.isCollapsed(selection)
    if (isCollapsed && isBlankActive(editor)) {
      const blankElement = getBlankElement(editor) || null
      setSelectedElement(
        blankElement?.blankId === blankId ? blankElement : null
      )
    } else {
      setSelectedElement(null)
    }
  }, [selection, editor, blankId])

  const isBlankAnswerAlphabetical = useMemo(() => {
    if (correctAnswers[0]?.length === 0) return true
    return /^[a-zA-Z]+$/.test(correctAnswers[0])
  }, [correctAnswers])

  function handleAlternativeAnswerAdd() {
    onAlternativeAnswerAdd()
    setTimeout(() => {
      const inputs = inputsWrapper.current?.querySelectorAll('input')
      inputs?.[inputs.length - 1].focus()
    }, 10)
  }

  function handleAlternativeAnswerRemove(index: number) {
    onAlternativeAnswerRemove(index)
    setTimeout(() => {
      const inputs = inputsWrapper.current?.querySelectorAll('input')
      if (!inputs) return
      // At index 0 is the answer from the blank input, which is not included in `inputs` constant, therefore indexing is shifted
      const previousInput = inputs[index - 2]
      if (previousInput) return previousInput.focus()
      const nextInput = inputs[index - 1]
      if (nextInput) nextInput.focus()
    }, 10)
  }

  if (!selectedElement) return null

  return (
    <SlateOverlay width={wrapperWidth} anchor={selectedElement}>
      <div
        className="p-side"
        onClick={(event) => {
          if (event.detail === 3) {
            event.stopPropagation()
          }
        }}
      >
        {isBlankAnswerAlphabetical ? null : (
          <label className="items-top mb-6 flex cursor-pointer text-sm">
            <input
              className="w-0.25 opacity-0"
              type="checkbox"
              checked={acceptMathEquivalents || false}
              onChange={onAcceptMathEquivalentsChange}
            />
            <FaIcon
              icon={acceptMathEquivalents ? faCheckSquare : faSquare}
              className="mr-[7px] mt-[3px] text-xl text-editor-primary"
            />
            {blanksExerciseStrings.acceptMathEquivalents}
          </label>
        )}
        {correctAnswers.length <= 1 ? (
          <button
            onClick={handleAlternativeAnswerAdd}
            className="serlo-button-editor-primary text-sm font-normal"
          >
            <FaIcon className="mr-1" icon={faPlus} />
            {blanksExerciseStrings.addAlternativeAnswer}
          </button>
        ) : (
          <div>
            <div className="mb-4 text-sm font-bold">
              {blanksExerciseStrings.alternativeAnswers}
            </div>
            <div
              className="flex flex-wrap items-center gap-2"
              ref={inputsWrapper}
            >
              {correctAnswers.map((answer, index) => {
                const isAnswerFromBlankInput = index === 0
                if (isAnswerFromBlankInput) return null

                return (
                  <RemovableInputWrapper
                    key={index}
                    tooltipText={blanksExerciseStrings.removeAlternativeAnswer}
                    onRemoveClick={() => {
                      handleAlternativeAnswerRemove(index)
                    }}
                  >
                    <AutogrowInput
                      value={answer}
                      className="serlo-input-font-reset"
                      onChange={(event) => {
                        onAlternativeAnswerChange(index, event.target.value)
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          handleAlternativeAnswerAdd()
                        }
                        if (event.key === 'Backspace' && answer === '') {
                          handleAlternativeAnswerRemove(index)
                        }
                      }}
                    />
                  </RemovableInputWrapper>
                )
              })}
              <button
                onClick={handleAlternativeAnswerAdd}
                className="serlo-button-editor-primary h-5 w-5 p-0 text-xs"
              >
                <FaIcon icon={faPlus} className="h-5 w-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </SlateOverlay>
  )
}
