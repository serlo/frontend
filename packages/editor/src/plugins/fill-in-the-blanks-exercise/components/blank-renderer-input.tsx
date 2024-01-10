import { ChangeEventHandler, KeyboardEventHandler, forwardRef } from 'react'

import { FillInTheBlanksContextType } from '../context/blank-context'
import { cn } from '@/helper/cn'

interface BlankRendererInputProps {
  blankId: string
  context: FillInTheBlanksContextType
  onChange?: ChangeEventHandler<HTMLInputElement>
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
}

export const BlankRendererInput = forwardRef<
  HTMLInputElement,
  BlankRendererInputProps
>(function BlankRendererInput(props, ref) {
  const { blankId, context, onChange, onKeyDown } = props

  const feedback = context.feedbackForBlanks
  const isAnswerCorrect = feedback.get(blankId)?.isCorrect
  const text = context.textInBlanks.get(blankId)?.text ?? ''

  return (
    <input
      ref={ref}
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
      onKeyDown={(event) => {
        onKeyDown?.(event)
      }}
    />
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
