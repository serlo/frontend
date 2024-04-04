import { createContext } from 'react'

export const ExerciseGroupIdContext = createContext<number | undefined>(
  undefined
)

export const ExerciseGroupIdProvider = ExerciseGroupIdContext.Provider
