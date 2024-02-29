import { createContext } from 'react'

import type { BlankId, DraggableId, BlanksExerciseMode } from '..'

export interface BlanksContextType {
  mode: BlanksExerciseMode
  feedbackForBlanks: {
    value: Map<BlankId, { isCorrect?: boolean }>
    set: React.Dispatch<
      React.SetStateAction<Map<BlankId, { isCorrect?: boolean }>>
    >
  }
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
  isFeedbackVisible: {
    value: boolean
    set: React.Dispatch<React.SetStateAction<boolean>>
  }
}

// Used to pass state to BlankRenderer from BlanksExerciseRenderer
// BlankRenderer will use this state alongside the state stored in the slate custom element 'textBlank' to render.
export const BlanksContext = createContext<BlanksContextType | null>(null)
