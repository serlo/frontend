import { createContext, useContext } from 'react'

const ExerciseIdContext = createContext<string>('')

export const ExerciseIdProvider = ExerciseIdContext.Provider

export function useExerciseId() {
  return useContext(ExerciseIdContext)
}
