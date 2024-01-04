import { cn } from '@serlo/frontend/src/helper/cn'
import { ChangeEventHandler, KeyboardEvent, createRef, useEffect } from 'react'
import { Editor, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

import type { FillInTheBlanksContextType } from '../context/blank-context'

interface BlankRendererInputProps {
  blankId: string
  context: FillInTheBlanksContextType
  editor?: Editor
  onChange?: ChangeEventHandler<HTMLInputElement>
}

/** Renders either an input element (where user can type into) or a drop area (where user can drop draggable answers) depending on the mode  */
export function BlankRendererInput(props: BlankRendererInputProps) {
  const { blankId, context, editor } = props

  const feedback = context.feedbackForBlanks
  const isAnswerCorrect = feedback.get(blankId)?.isCorrect
  const text = context.textInBlanks.get(blankId)?.text ?? ''

  // Autofocus input
  const inputRef = createRef<HTMLInputElement>()
  useEffect(() => {
    const input = inputRef.current
    if (input) input.focus()
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        props.onChange?.(event)
      }}
      onKeyDown={handleMoveOut}
    />
  )

  function handleMoveOut(event: KeyboardEvent<HTMLInputElement>) {
    if (!inputRef || !inputRef.current || !editor) return

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
      context?.textUserTypedIntoBlanks.value
    )

    // Set new text
    newTextUserTypedIntoBlankList.set(blankId, { text: newText })

    // Update state
    context?.textUserTypedIntoBlanks.set(newTextUserTypedIntoBlankList)
  }
}
