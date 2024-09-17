import { createContext } from 'react'

import { DropzoneVisibility, type AnswerZoneState } from '../types'

const emptyAnswersArray = [] as any[] as AnswerZoneState['answers']

export interface AnswerZonesContextType {
  answerZones: AnswerZoneState[]
  dropzoneVisibility: DropzoneVisibility
  extraDraggableAnswers: AnswerZoneState['answers']
}

export const defaultAnswerZonesContext: AnswerZonesContextType = {
  answerZones: [],
  dropzoneVisibility: DropzoneVisibility.Full,
  extraDraggableAnswers: emptyAnswersArray,
}

export const AnswerZonesContext = createContext<AnswerZonesContextType>(
  defaultAnswerZonesContext
)
