import { removeBlanks } from '@editor/editor-ui/plugin-toolbar/text-controls/utils/blank'
import {
  ChangeEvent,
  KeyboardEvent as ReactKeyboardEvent,
  useRef,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import { Range, Transforms } from 'slate'
import { ReactEditor, useSelected, useSlate, useFocused } from 'slate-react'

import { BlankControls } from './components/blank-controls'
import { BlankRendererInput } from './components/blank-renderer-input'
import { BlanksContext } from './context/blank-context'
import type { BlankInterface } from './types'

interface BlankRendererProps {
  element: BlankInterface
  focused: boolean
}

export function BlankRenderer(props: BlankRendererProps) {
  const { element, focused } = props
  const { blankId, correctAnswers } = element

  const editor = useSlate()
  const selected = useSelected()
  const slateFocused = useFocused()

  // The `acceptMathEquivalents` setting is on by default.
  // However, some blanks in the DB are missing this property altogether,
  // so we set it to `true` if it is `undefined`.
  const acceptMathEquivalents = useMemo(() => {
    if (element.acceptMathEquivalents === undefined) return true
    return element.acceptMathEquivalents
  }, [element.acceptMathEquivalents])

  const inputRef = useRef<HTMLInputElement | null>(null)

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

  const context = useContext(BlanksContext)
  if (context === null) return null

  return (
    <>
      <BlankRendererInput
        ref={inputRef}
        blankId={blankId}
        context={context}
        onChange={handleChange}
        onKeyDown={handleMoveOut}
        onBlur={handleBlur}
      />
      {focused && context.mode === 'typing' ? (
        <BlankControls
          blankId={blankId}
          correctAnswers={correctAnswers.map(({ answer }) => answer)}
          acceptMathEquivalents={acceptMathEquivalents}
          onAlternativeAnswerAdd={handleAlternativeAnswerAdd}
          onAlternativeAnswerChange={handleCorrectAnswerChange}
          onAlternativeAnswerRemove={handleAlternativeAnswerRemove}
          onAcceptMathEquivalentsChange={handleAcceptMathEquivalentsChange}
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

  function handleBlur() {
    // Trim the text inside of the blank input
    handleCorrectAnswerChange(0, correctAnswers[0]?.answer.trim())
    setCorrectAnswers(
      correctAnswers
        // Trim the text inside of alternative answers inputs
        .map(({ answer }) => ({ answer: answer.trim() }))
        // Filter out the empty alternative answers except the first one (index === 0)
        .filter(({ answer }, index) => index === 0 || answer.length > 0)
    )
  }

  function handleAlternativeAnswerAdd() {
    ReactEditor.blur(editor)
    setCorrectAnswers([...correctAnswers, { answer: '' }])
  }

  function handleCorrectAnswerChange(targetIndex: number, newValue: string) {
    setCorrectAnswers(
      correctAnswers.map(({ answer }, i) => ({
        answer: i === targetIndex ? newValue : answer,
      }))
    )
  }

  function handleAlternativeAnswerRemove(targetIndex: number) {
    setCorrectAnswers(correctAnswers.filter((_, i) => i !== targetIndex))
  }

  function setCorrectAnswers(correctAnswers: Array<{ answer: string }>) {
    const at = ReactEditor.findPath(editor, element)
    Transforms.setNodes(editor, { correctAnswers }, { at })
  }

  function handleAcceptMathEquivalentsChange() {
    Transforms.setNodes(
      editor,
      { acceptMathEquivalents: !acceptMathEquivalents },
      { at: ReactEditor.findPath(editor, element) }
    )
  }
}
