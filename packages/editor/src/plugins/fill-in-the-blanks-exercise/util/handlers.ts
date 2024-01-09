import type { FillInTheBlanksContextType } from '../context/blank-context'

export function setTextUserTypedIntoBlank(
  context: FillInTheBlanksContextType,
  blankId: string,
  newText: string
) {
  // Copy Map object
  const newTextUserTypedIntoBlankList = new Map<string, { text: string }>(
    context.textUserTypedIntoBlanks.value
  )

  // Set new text
  newTextUserTypedIntoBlankList.set(blankId, { text: newText })

  // Update state
  context.textUserTypedIntoBlanks.set(newTextUserTypedIntoBlankList)
}
