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
  canvasHeight: string
  canvasWidth: string
  currentAnswerZone: answerZoneType
  onChangeDimensions: (
    id: string,
    dimensions: { width: number; height: number }
  ) => void
  selectAnswerZone: (id: string) => void
  moveAnswerZone: (
    answerZone: answerZoneType,
    left: number,
    top: number
  ) => void
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
  canvasHeight: '786px',
  canvasWidth: '786px',
  currentAnswerZone: defaultAnswerZone,
  onChangeDimensions: (
    _id: string,
    _dimensions: { width: number; height: number }
  ) => {},
  selectAnswerZone: (_id: string) => {},
  moveAnswerZone: (
    _answerZone: answerZoneType,
    _left: number,
    _top: number
  ) => {},
}

export const AnswerZonesContext = createContext<AnswerZonesContextType>(
  defaultAnswerZonesContext
)
