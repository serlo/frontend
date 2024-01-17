import { removeBlanks } from '@editor/editor-ui/plugin-toolbar/text-controls/utils/blank'
import {
  ChangeEvent,
  KeyboardEvent as ReactKeyboardEvent,
  createRef,
  useContext,
  useEffect,
} from 'react'
import { Range, Transforms } from 'slate'
import { ReactEditor, useSelected, useSlate, useFocused } from 'slate-react'

import { BlankRendererInput } from './components/blank-renderer-input'
import { FillInTheBlanksContext } from './context/blank-context'
import type { Blank } from '../text'

interface BlankRendererProps {
  element: Blank
}

export function BlankRenderer({ element }: BlankRendererProps) {
  const editor = useSlate()
  const selected = useSelected()
  const focused = useFocused()

  // Autofocus when adding and removing a blank
  const inputRef = createRef<HTMLInputElement>()
  useEffect(() => {
    // Focus input when the blank is added
    const input = inputRef.current
    if (!input) return
    setTimeout(() => {
      input.focus()
    })

    // Editor gets refocused when the blank is removed from within
    // text-controls/utils/blank.ts as it leads to slate errors on unmount.

    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Focus input when the blank is selected using arrow keys
  // + set cursor at the start if entering using right arrow key
  useEffect(() => {
    function handleDocumentKeydown(event: KeyboardEvent) {
      const input = inputRef.current
      const shouldFocusInput =
        input &&
        document.activeElement !== input &&
        focused &&
        selected &&
        editor.selection &&
        Range.isCollapsed(editor.selection)
      if (!shouldFocusInput) return
      input.focus()
      if (event.key === 'ArrowRight') input.setSelectionRange(0, 0)
    }

    document.addEventListener('keydown', handleDocumentKeydown)

    return () => document.removeEventListener('keydown', handleDocumentKeydown)
  }, [editor, focused, inputRef, selected])

  const context = useContext(FillInTheBlanksContext)
  if (context === null) return null

  return (
    <BlankRendererInput
      ref={inputRef}
      blankId={element.blankId}
      context={context}
      onChange={handleChange}
      onKeyDown={handleMoveOut}
    />
  )

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const at = ReactEditor.findPath(editor, element)
    const correctAnswers = element.correctAnswers.map((correctAnswer, i) => {
      // First element is set to new value
      if (i === 0) return { answer: event.target.value.trim() }
      // Rest is copied as is
      return { ...correctAnswer }
    })
    Transforms.setNodes(editor, { correctAnswers }, { at })
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
}
