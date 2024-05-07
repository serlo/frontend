import { createContext } from 'react'

/** Id for exercises in analytics */
export const ExerciseIdContext = createContext<number | undefined>(undefined)

export const ExerciseIdProvider = ExerciseIdContext.Provider
