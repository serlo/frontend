import { createContext } from 'react'

import type { answerZoneType } from '../types'

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

const emptyAnswersArray = [] as any[] as answerZoneType['answers']

export interface AnswerZonesContextType {
  zones: answerZoneType[]
  canvasShape: 'square' | 'landscape' | 'portrait'
  currentAnswerZone: answerZoneType
  selectAnswerZone: (id: string) => void
}

// Provide a default structure for answerZoneType
const defaultAnswerZone: answerZoneType = {
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
  canvasShape: 'square',
  currentAnswerZone: defaultAnswerZone,
  selectAnswerZone: (_id: string) => {},
}

export const AnswerZonesContext = createContext<AnswerZonesContextType>(
  defaultAnswerZonesContext
)
