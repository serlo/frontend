import { AutogrowInput } from '@editor/editor-ui/autogrow-input'
import { type ComponentProps, forwardRef } from 'react'

import { BlankId } from '..'
import { BlanksContextType } from '../context/blank-context'
import { cn } from '@/helper/cn'

interface BlankRendererInputProps {
  blankId: string
  context: BlanksContextType
  isAnswerCorrect?: boolean
}

export const BlankRendererInput = forwardRef<
  HTMLInputElement,
  BlankRendererInputProps & ComponentProps<'input'>
>(function BlankRendererInput(props, ref) {
  const { blankId, context, isAnswerCorrect, onChange, onKeyDown, onBlur } =
    props

  const text = context.textInBlanks.get(blankId)?.text ?? ''

  return (
    <AutogrowInput
      ref={ref}
      value={text}
      className={cn(
        'h-[25px]',
        isAnswerCorrect && 'border-green-500 focus:outline-green-500',
        isAnswerCorrect === false && 'border-red-400 focus:outline-red-400'
      )}
      data-qa="blank-input"
      onChange={(event) => {
        setTextUserTypedIntoBlank(event.target.value)
        onChange?.(event)
      }}
      onKeyDown={onKeyDown}
      onBlur={(event) => {
        setTextUserTypedIntoBlank(text.trim())
        onBlur?.(event)
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

    // Reset feedback state (hide): I think a better UX here would be to keep
    // calling the onEvaluate() as the user updates without having to click on
    // "Stimmt's?" again. Right now the feedback is hidden entirely on blur.
    context.isFeedbackVisible.set(false)
    context.feedbackForBlanks.set(
      new Map<BlankId, { isCorrect: boolean | undefined }>()
    )
  }
})
