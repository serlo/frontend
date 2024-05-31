import { createContext } from 'react'

// @@@ Rename in exercise context
export const ExerciseIdsContext = createContext<{
  exerciseTrackingId?: number
  isInExerciseGroup?: boolean
  hasEntityId?: boolean
}>({})

export const ExerciseIdsProvider = ExerciseIdsContext.Provider
