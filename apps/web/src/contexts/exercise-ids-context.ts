import { createContext } from 'react'

export const ExerciseIdsContext = createContext<
  | {
      exerciseId?: number
      exerciseTrackingId?: number
      exerciseGroupId?: number
      exerciseGroupTrackingId?: number
    }
  | undefined
>(undefined)

export const ExerciseIdsProvider = ExerciseIdsContext.Provider
