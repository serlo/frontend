import { createContext } from 'react'

type GapId = string

// Used to pass state to GapRenderer from FillInTheGapRenderer
// GapRenderer will use this state alongside the state stored in the slate custom element 'gap' to render.
export const GapStatesContext = createContext<{
  mode: string
  gapFeedback: Map<GapId, { isCorrect?: boolean }>
  textUserTypedIntoGap: {
    value: Map<GapId, { text: string }>
    set: React.Dispatch<React.SetStateAction<Map<GapId, { text: string }>>>
  }
} | null>(null)
