import { createContext } from 'react'

import { AnswerType, BackgroundShape, type AnswerZoneState } from '../types'

// Define default values for state management
const emptyVal = {
  value: 0,
  get: () => 0,
  set: (_value: number) => {},
}

const emptyBooleanVal = {
  value: false,
  get: () => false,
  set: (_value: boolean) => {},
}

const emptyStrVal = {
  value: '',
  get: () => '',
  set: (_value: string) => {},
}

const emptyAnswersArray = [] as any[] as AnswerZoneState['answers']

export interface AnswerZonesContextType {
  zones: AnswerZoneState[]
  canvasShape: BackgroundShape
  currentAnswerZone: AnswerZoneState
  currentAnswerIndex: number
  currentAnswerType: AnswerType
  selectAnswerZone: (id: string) => void
  selectCurrentAnswer: (index: number, type: AnswerType) => void
  dropzoneVisibility: 'full' | 'partial' | 'none'
}

// Provide a default structure for answerZoneType
const defaultAnswerZone: AnswerZoneState = {
  id: emptyStrVal,
  name: emptyStrVal,
  layout: {
    width: emptyVal,
    height: emptyVal,
    visible: emptyBooleanVal,
    lockedAspectRatio: emptyBooleanVal,
  },
  position: {
    left: emptyVal,
    top: emptyVal,
  },
  answers: emptyAnswersArray,
}

export const defaultAnswerZonesContext: AnswerZonesContextType = {
  zones: [],
  canvasShape: BackgroundShape.Square,
  currentAnswerZone: defaultAnswerZone,
  currentAnswerIndex: 0,
  currentAnswerType: AnswerType.Unset,
  selectAnswerZone: (_id: string) => {},
  selectCurrentAnswer: (_index: number, _type: AnswerType) => {},
  dropzoneVisibility: 'full',
}

export const AnswerZonesContext = createContext<AnswerZonesContextType>(
  defaultAnswerZonesContext
)
