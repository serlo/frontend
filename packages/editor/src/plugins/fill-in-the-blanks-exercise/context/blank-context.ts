import { createContext } from 'react'

import type { BlankId, DraggableId, FillInTheBlanksMode } from '..'

export interface FillInTheBlanksContextType {
  mode: FillInTheBlanksMode
  feedbackForBlanks: Map<BlankId, { isCorrect?: boolean }>
  textInBlanks: Map<BlankId, { text: string }>
  textUserTypedIntoBlanks: {
    value: Map<BlankId, { text: string }>
    set: React.Dispatch<React.SetStateAction<Map<BlankId, { text: string }>>>
  }
  draggables: {
    draggableId: DraggableId
    text: string
  }[]
  locationOfDraggables: {
    value: Map<DraggableId, BlankId>
    set: React.Dispatch<React.SetStateAction<Map<DraggableId, BlankId>>>
  }
}

// Used to pass state to BlankRenderer from FillInTheBlanksRenderer
// BlankRenderer will use this state alongside the state stored in the slate custom element 'textBlank' to render.
export const FillInTheBlanksContext =
  createContext<FillInTheBlanksContextType | null>(null)
