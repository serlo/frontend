import { createContext, useContext } from 'react'

export interface ExerciseFolderStatsData {
  data: {
    [key: string]: { correct: number; wrong: number; afterTrying: number }
  }
  fullCount: number
  date: string
}

export const ExerciseFolderStatsContext =
  createContext<ExerciseFolderStatsData | null>(null)

export const ExerciseFolderStatsProvider = ExerciseFolderStatsContext.Provider

export function useExerciseFolderStats() {
  return useContext(ExerciseFolderStatsContext)
}
