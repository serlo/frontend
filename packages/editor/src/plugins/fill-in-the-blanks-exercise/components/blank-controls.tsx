import {
  getBlankElement,
  isBlankActive,
} from '@editor/editor-ui/plugin-toolbar/text-controls/utils/blank'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
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
  onAlternativeAnswerAdd: () => void
  onAlternativeAnswerChange: (targetIndex: number, newValue: string) => void
  onAlternativeAnswerRemove: (targetIndex: number) => void
}

export function BlankControls(props: BlankControlsProps) {
  const {
    blankId,
    correctAnswers,
    onAlternativeAnswerAdd,
    onAlternativeAnswerChange,
    onAlternativeAnswerRemove,
  } = props
  const [selectedElement, setSelectedElement] = useState<Blank | null>(null)

  const editor = useSlate()
  const { selection } = editor

  const wrapper = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)

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
    if (!wrapper.current || !selectedElement) return

    const anchorRect = ReactEditor.toDOMNode(
      editor,
      selectedElement
    )?.getBoundingClientRect()

    const parentRect = wrapper.current
      .closest('.rows-editor-renderer-container')
      ?.getBoundingClientRect()

    const offsetRect = wrapper.current.offsetParent?.getBoundingClientRect()

    if (!anchorRect || !parentRect || !offsetRect) return

    const boundingLeft = anchorRect.left - 2 // wrapper starts at anchor's left

    const boundingWrapperRight = boundingLeft + wrapperWidth
    const overlap = boundingWrapperRight - parentRect.right
    const fallbackBoundingLeft = boundingLeft - overlap // wrapper ends at editor's right

    wrapper.current.style.left = `${
      (overlap > 0 ? fallbackBoundingLeft : boundingLeft) - offsetRect.left - 5
    }px`
    wrapper.current.style.top = `${anchorRect.bottom + 6 - offsetRect.top}px`
  }, [editor, selectedElement])

  function handleAddButtonClick() {
    onAlternativeAnswerAdd()
    setTimeout(() => input.current?.focus(), 10)
  }

  if (!selectedElement) return null

  return (
    <div ref={wrapper} className="absolute z-[95] whitespace-nowrap">
      <div
        className="w-[460px] rounded bg-white p-side text-start not-italic shadow-menu"
        style={{ width: `${wrapperWidth}px` }}
      >
        {correctAnswers.length <= 1 ? (
          <button
            onClick={handleAddButtonClick}
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
            <div className="flex flex-wrap items-center gap-2">
              {correctAnswers.map((answer, index) => {
                const isAnswerFromBlankInput = index === 0
                if (isAnswerFromBlankInput) return null

                return (
                  <AlternativeAnswer
                    key={index}
                    answer={answer}
                    index={index}
                    ref={input}
                    onAdd={handleAddButtonClick}
                    onChange={onAlternativeAnswerChange}
                    onRemove={onAlternativeAnswerRemove}
                  />
                )
              })}
              <button
                onClick={handleAddButtonClick}
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
