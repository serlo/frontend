import { createContext } from 'react'

export const ExerciseContext = createContext<{
  exerciseTrackingId?: number
  isInExerciseGroup?: boolean
  hasEntityId?: boolean
}>({})
