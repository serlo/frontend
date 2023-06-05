import { createContext, useContext } from 'react'

export interface ExerciseFolderStatsData {
  data: {
    [key: string]: {
      correct: number
      wrong: number
      afterTrying: number
      solutionOpen: number
    }
  }
  fullCount: number
  date: string
  revisions: number[]
  times: string[]
}

export const ExerciseFolderStatsContext =
  createContext<ExerciseFolderStatsData | null>(null)

export const ExerciseFolderStatsProvider = ExerciseFolderStatsContext.Provider

export function useExerciseFolderStats() {
  return useContext(ExerciseFolderStatsContext)
}
