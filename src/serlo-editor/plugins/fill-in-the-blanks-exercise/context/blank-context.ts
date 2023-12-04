import { createContext } from 'react'

import type { FillInTheBlanksMode } from '..'

type BlankId = string

// Used to pass state to BlankRenderer from FillInTheBlanksRenderer
// BlankRenderer will use this state alongside the state stored in the slate custom element 'blank' to render.
export const FillInTheBlanksContext = createContext<{
  mode: FillInTheBlanksMode
  feedbackForBlanks: Map<BlankId, { isCorrect?: boolean }>
  textInBlanks: Map<BlankId, { text: string }>
  textUserTypedIntoBlanks: {
    value: Map<BlankId, { text: string }>
    set: React.Dispatch<React.SetStateAction<Map<BlankId, { text: string }>>>
  }
} | null>(null)
