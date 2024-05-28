import { createContext } from 'react'

import type { answerZoneType } from '../types'

export interface AnswerZonesContextType {
  zones: answerZoneType[]
}

export const AnswerZonesContext = createContext<AnswerZonesContextType | null>(
  null
)
