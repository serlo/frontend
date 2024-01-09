import { cn } from '@serlo/frontend/src/helper/cn'
import { ChangeEventHandler } from 'react'

import type { FillInTheBlanksContextType } from '../context/blank-context'

interface BlankRendererInputPropsStatic {
  blankId: string
  context: FillInTheBlanksContextType
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export function BlankRendererInputStatic(props: BlankRendererInputPropsStatic) {
  const { blankId, context, onChange } = props

  const feedback = context.feedbackForBlanks
  const isAnswerCorrect = feedback.get(blankId)?.isCorrect
  const text = context.textInBlanks.get(blankId)?.text ?? ''

  return (
    <input
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
}
