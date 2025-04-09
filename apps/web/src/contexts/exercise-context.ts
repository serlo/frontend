import { createContext } from 'react'

export const ExerciseContext = createContext<{
  isInExerciseGroup?: boolean
  isEntity?: boolean
}>({})
