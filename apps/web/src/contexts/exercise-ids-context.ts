import { createContext } from 'react'

export const ExerciseIdsContext = createContext<
  | {
      exerciseEntityId?: number
      exerciseTrackingId?: number
      exerciseGroupEntityId?: number
    }
  | undefined
>(undefined)

export const ExerciseIdsProvider = ExerciseIdsContext.Provider
