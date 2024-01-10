import {
  ChangeEventHandler,
  KeyboardEvent as ReactKeyboardEvent,
  createRef,
  useContext,
  useEffect,
} from 'react'
import { Range, Transforms } from 'slate'
import { ReactEditor, useSelected, useSlate, useFocused } from 'slate-react'

import { BlankRendererInput } from './components/blank-renderer-input'
import { FillInTheBlanksContext } from './context/blank-context'

interface BlankRendererProps {
  blankId: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export function BlankRenderer(props: BlankRendererProps) {
  const { blankId, onChange } = props

  const editor = useSlate()
  const selected = useSelected()
  const focused = useFocused()

  // Autofocus when adding and removing a blank
  const inputRef = createRef<HTMLInputElement>()
  useEffect(() => {
    // Focus input when the blank is added
    const input = inputRef.current
    if (input) input.focus()

    // Focus editor when the blank is removed
    return () => {
      ReactEditor.focus(editor)
    }

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
      blankId={blankId}
      context={context}
      onChange={onChange}
      onKeyDown={handleMoveOut}
    />
  )

  function handleMoveOut(event: ReactKeyboardEvent<HTMLInputElement>) {
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
}
