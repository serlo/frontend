import { cn } from '@serlo/frontend/src/helper/cn'
import { ChangeEventHandler, KeyboardEvent, createRef, useEffect } from 'react'
import { Range, Transforms } from 'slate'
import { ReactEditor, useSelected, useSlate, useFocused } from 'slate-react'

import type { FillInTheBlanksContextType } from '../context/blank-context'

interface BlankRendererInputProps {
  blankId: string
  context: FillInTheBlanksContextType
  onChange?: ChangeEventHandler<HTMLInputElement>
}

/** Renders either an input element (where user can type into) or a drop area (where user can drop draggable answers) depending on the mode  */
export function BlankRendererInput(props: BlankRendererInputProps) {
  const { blankId, context, onChange } = props

  const editor = useSlate()
  const selected = useSelected()
  const focused = useFocused()

  const feedback = context.feedbackForBlanks
  const isAnswerCorrect = feedback.get(blankId)?.isCorrect
  const text = context.textInBlanks.get(blankId)?.text ?? ''

  // Autofocus input when the blank is created
  const inputRef = createRef<HTMLInputElement>()
  useEffect(() => {
    const input = inputRef.current
    if (input) input.focus()
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Focus input when the blank is selected using arrow keys
  const shouldFocusInput =
    focused &&
    selected &&
    editor.selection &&
    Range.isCollapsed(editor.selection)
  useEffect(() => {
    const input = inputRef.current
    if (input && document.activeElement !== input && shouldFocusInput) {
      input.focus()
    }
  }, [inputRef, shouldFocusInput])

  return (
    <input
      ref={inputRef}
      className={cn(
        'h-[25px] resize-none rounded-full border border-brand bg-brand-50 pl-2 pr-1',
        isAnswerCorrect && 'border-green-500',
        isAnswerCorrect === false && 'border-red-500'
      )}
      size={(text.length ?? 4) + 1}
      spellCheck={false}
      autoCorrect="off"
      placeholder=""
      type="text"
      value={text}
      onChange={(event) => {
        setTextUserTypedIntoBlank(event.target.value)
        onChange?.(event)
      }}
      onKeyDown={handleMoveOut}
    />
  )

  function handleMoveOut(event: KeyboardEvent<HTMLInputElement>) {
    if (!inputRef || !inputRef.current) return

    const { selectionStart, selectionEnd, value } = inputRef.current

    const selectionCollapsed = selectionStart === selectionEnd
    const caretAtRightEnd = selectionEnd === value.length
    const caretAtLeftEnd = selectionStart === 0

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

  function setTextUserTypedIntoBlank(newText: string) {
    // Copy Map object
    const newTextUserTypedIntoBlankList = new Map<string, { text: string }>(
      context.textUserTypedIntoBlanks.value
    )

    // Set new text
    newTextUserTypedIntoBlankList.set(blankId, { text: newText })

    // Update state
    context.textUserTypedIntoBlanks.set(newTextUserTypedIntoBlankList)
  }
}
