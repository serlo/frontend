import { createContext } from 'react'

type BlankId = string

// Used to pass state to BlankRenderer from FillInTheBlanksRenderer
// BlankRenderer will use this state alongside the state stored in the slate custom element 'blank' to render.
export const BlankStatesContext = createContext<{
  mode: string
  blanksFeedback: Map<BlankId, { isCorrect?: boolean }>
  textUserTypedIntoBlank: {
    value: Map<BlankId, { text: string }>
    set: React.Dispatch<React.SetStateAction<Map<BlankId, { text: string }>>>
  }
} | null>(null)
