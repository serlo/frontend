import {
  getBlankElement,
  isBlankActive,
} from '@editor/editor-ui/plugin-toolbar/text-controls/utils/blank'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { faCheckSquare, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState, useMemo } from 'react'
import { Range } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'

import { AlternativeAnswer } from './alternative-answer'
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

  const overlayWrapper = useRef<HTMLDivElement>(null)
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

  // Positioning of the overlay relative to the anchor
  useEffect(() => {
    if (!overlayWrapper.current || !selectedElement) return

    const anchorRect = ReactEditor.toDOMNode(
      editor,
      selectedElement
    )?.getBoundingClientRect()

    const parentRect = overlayWrapper.current
      .closest('.rows-editor-renderer-container')
      ?.getBoundingClientRect()

    const offsetRect =
      overlayWrapper.current.offsetParent?.getBoundingClientRect()

    if (!anchorRect || !parentRect || !offsetRect) return

    const boundingLeft = anchorRect.left - 2 // wrapper starts at anchor's left

    const boundingWrapperRight = boundingLeft + wrapperWidth
    const overlap = boundingWrapperRight - parentRect.right
    const fallbackBoundingLeft = boundingLeft - overlap // wrapper ends at editor's right

    overlayWrapper.current.style.left = `${
      (overlap > 0 ? fallbackBoundingLeft : boundingLeft) - offsetRect.left - 5
    }px`
    overlayWrapper.current.style.top = `${
      anchorRect.bottom + 6 - offsetRect.top
    }px`
  }, [editor, selectedElement])

  const isBlankAnswerAlphabetical = useMemo(() => {
    if (correctAnswers[0].length === 0) return true
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
    <div ref={overlayWrapper} className="absolute z-[95] whitespace-nowrap">
      <div
        className="w-[460px] rounded bg-white p-side text-start not-italic shadow-menu"
        style={{ width: `${wrapperWidth}px` }}
      >
        {isBlankAnswerAlphabetical ? null : (
          <div className="mb-6 flex">
            <input
              className="w-0.25 opacity-0"
              id={'acceptMathEquivalentCheckbox_' + blankId}
              type="checkbox"
              checked={acceptMathEquivalents || false}
              onChange={onAcceptMathEquivalentsChange}
            />
            <label
              className="text-wrap flex cursor-pointer items-center text-sm"
              htmlFor={'acceptMathEquivalentCheckbox_' + blankId}
            >
              <FaIcon
                icon={acceptMathEquivalents ? faCheckSquare : faSquare}
                className="mr-1.5 text-xl text-editor-primary"
              />
              {blanksExerciseStrings.acceptMathEquivalents}
            </label>
          </div>
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
                  <AlternativeAnswer
                    key={index}
                    answer={answer}
                    index={index}
                    onAdd={handleAlternativeAnswerAdd}
                    onChange={onAlternativeAnswerChange}
                    onRemove={handleAlternativeAnswerRemove}
                  />
                )
              })}
              <button
                onClick={handleAlternativeAnswerAdd}
                className="serlo-button-editor-primary h-5 w-5 px-1 py-0 text-xs"
              >
                <FaIcon icon={faPlus} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
