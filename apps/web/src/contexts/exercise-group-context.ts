import { createContext } from 'react'

export const ExerciseGroupContext = createContext<boolean | undefined>(false)

export const ExerciseGroupProvider = ExerciseGroupContext.Provider
