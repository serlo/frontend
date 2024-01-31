import { removeBlanks } from '@editor/editor-ui/plugin-toolbar/text-controls/utils/blank'
import {
  ChangeEvent,
  KeyboardEvent as ReactKeyboardEvent,
  useRef,
  useContext,
  useEffect,
} from 'react'
import { Range, Transforms } from 'slate'
import { ReactEditor, useSelected, useSlate, useFocused } from 'slate-react'

import { BlankControls } from './components/blank-controls'
import { BlankRendererInput } from './components/blank-renderer-input'
import { FillInTheBlanksContext } from './context/blank-context'
import type { BlankInterface } from './types'

interface BlankRendererProps {
  element: BlankInterface
  focused: boolean
}

export function BlankRenderer({ element, focused }: BlankRendererProps) {
  const editor = useSlate()
  const selected = useSelected()
  const slateFocused = useFocused()

  // Autofocus when adding and removing a blank
  const inputRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    // Focus input when the blank is added
    setTimeout(() => inputRef.current?.focus())
  }, [inputRef])

  // Focus input when the blank is selected using arrow keys
  // + set cursor at the start if entering using right arrow key
  useEffect(() => {
    function handleDocumentKeydown(event: KeyboardEvent) {
      const input = inputRef.current
      const shouldFocusInput =
        input &&
        document.activeElement !== input &&
        slateFocused &&
        selected &&
        editor.selection &&
        Range.isCollapsed(editor.selection)
      if (!shouldFocusInput) return
      input.focus()
      if (event.key === 'ArrowRight') input.setSelectionRange(0, 0)
    }

    document.addEventListener('keydown', handleDocumentKeydown)

    return () => document.removeEventListener('keydown', handleDocumentKeydown)
  }, [editor, slateFocused, inputRef, selected])

  const context = useContext(FillInTheBlanksContext)
  if (context === null) return null

  return (
    <>
      <BlankRendererInput
        ref={inputRef}
        blankId={element.blankId}
        context={context}
        onChange={handleChange}
        onKeyDown={handleMoveOut}
      />
      {focused && context.mode === 'typing' ? (
        <BlankControls
          blankId={element.blankId}
          correctAnswers={element.correctAnswers.map(({ answer }) => answer)}
          onAlternativeAnswerAdd={handleAlternativeAnswerAdd}
          onAlternativeAnswerChange={handleCorrectAnswerChange}
        />
      ) : null}
    </>
  )

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    handleCorrectAnswerChange(0, event.target.value)
  }

  function handleMoveOut(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (!inputRef || !inputRef.current) return

    const { selectionStart, selectionEnd, value } = inputRef.current

    const selectionCollapsed = selectionStart === selectionEnd
    const caretAtRightEnd = selectionEnd === value.length
    const caretAtLeftEnd = selectionStart === 0
    const isInputEmpty = value.length === 0

    if (isInputEmpty && (event.key === 'Backspace' || event.key === 'Delete')) {
      event.preventDefault()
      removeBlanks(editor)
    }

    // Move the selection right of the blank on arrow right
    if (
      event.key === 'ArrowRight' &&
      !event.shiftKey &&
      selectionCollapsed &&
      caretAtRightEnd
    ) {
      Transforms.move(editor, { unit: 'character' })
      ReactEditor.focus(editor)
    }

    // Move the selection left of the blank on arrow left
    if (
      event.key === 'ArrowLeft' &&
      !event.shiftKey &&
      selectionCollapsed &&
      caretAtLeftEnd
    ) {
      Transforms.move(editor, { unit: 'character', reverse: true })
      ReactEditor.focus(editor)
    }
  }

  function handleAlternativeAnswerAdd() {
    const at = ReactEditor.findPath(editor, element)
    const correctAnswers = [...element.correctAnswers, { answer: '' }]
    Transforms.setNodes(editor, { correctAnswers }, { at })
  }

  function handleCorrectAnswerChange(targetIndex: number, newValue: string) {
    const at = ReactEditor.findPath(editor, element)
    const correctAnswers = element.correctAnswers.map((correctAnswer, i) => {
      // Changed element is set to new value
      if (i === targetIndex) return { answer: newValue.trim() }
      // Rest is copied as is
      return { ...correctAnswer }
    })
    Transforms.setNodes(editor, { correctAnswers }, { at })
  }
}
