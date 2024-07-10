import { createContext } from 'react'

import {
  AnswerType,
  BackgroundShape,
  DropzoneVisibility,
  type AnswerZoneState,
} from '../types'

// Define default values for state management
const emptyVal = {
  value: 0,
  get: () => 0,
  set: (_value: number) => {},
}

const emptyStrVal = {
  value: '',
  get: () => '',
  set: (_value: string) => {},
}

const emptyAnswersArray = [] as any[] as AnswerZoneState['answers']

export interface AnswerZonesContextType {
  answerZones: AnswerZoneState[]
  canvasShape: BackgroundShape
  currentAnswerZone: AnswerZoneState
  currentAnswerIndex: number
  currentAnswerType: AnswerType
  selectAnswerZone: (id: string) => void
  selectCurrentAnswer: (index: number, type: AnswerType) => void
  dropzoneVisibility: DropzoneVisibility
  extraDraggableAnswers: AnswerZoneState['answers']
}

// Provide a default structure for answerZoneType
const defaultAnswerZone: AnswerZoneState = {
  id: emptyStrVal,
  name: emptyStrVal,
  layout: {
    width: emptyVal,
    height: emptyVal,
  },
  position: {
    left: emptyVal,
    top: emptyVal,
  },
  answers: emptyAnswersArray,
}

export const defaultAnswerZonesContext: AnswerZonesContextType = {
  answerZones: [],
  canvasShape: BackgroundShape.Square,
  currentAnswerZone: defaultAnswerZone,
  currentAnswerIndex: 0,
  currentAnswerType: AnswerType.Unset,
  selectAnswerZone: (_id: string) => {},
  selectCurrentAnswer: (_index: number, _type: AnswerType) => {},
  dropzoneVisibility: DropzoneVisibility.Full,
  extraDraggableAnswers: emptyAnswersArray,
}

export const AnswerZonesContext = createContext<AnswerZonesContextType>(
  defaultAnswerZonesContext
)
