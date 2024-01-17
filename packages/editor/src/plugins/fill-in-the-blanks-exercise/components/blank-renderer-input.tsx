import { ChangeEventHandler, KeyboardEventHandler, forwardRef } from 'react'

import { FillInTheBlanksContextType } from '../context/blank-context'
import { cn } from '@/helper/cn'

interface BlankRendererInputProps {
  blankId: string
  context: FillInTheBlanksContextType
  isAnswerCorrect?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
}

export const BlankRendererInput = forwardRef<
  HTMLInputElement,
  BlankRendererInputProps
>(function BlankRendererInput(props, ref) {
  const { blankId, context, isAnswerCorrect, onChange, onKeyDown } = props

  const text = context.textInBlanks.get(blankId)?.text ?? ''

  return (
    <span className="serlo-autogrow-input" data-value={text + '_'}>
      <input
        ref={ref}
        className={cn(
          'h-[25px] rounded-full border border-brand bg-brand-50',
          isAnswerCorrect && 'border-green-500',
          isAnswerCorrect === false && 'border-red-500'
        )}
        size={4}
        spellCheck={false}
        autoCorrect="off"
        placeholder=""
        type="text"
        value={text}
        onChange={(event) => {
          setTextUserTypedIntoBlank(event.target.value)
          onChange?.(event)
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event)
        }}
      />
    </span>
  )

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
})
