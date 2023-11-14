import { createContext, useContext } from 'react'

export interface ExerciseFolderStatsData {
  data: {
    [key: string]: {
      correct: number
      wrong: number
      afterTrying: number
      solutionOpen: number
      ivals: string[]
    }
  }
  fullCount: number
  interactiveCount: number
  date: string
  revisions: number[]
  times: string[]
  sessionsByDay: { date: string; count: number; medianTime: number }[]
  journeys: { [key: string]: number[] }
}

export const ExerciseFolderStatsContext =
  createContext<ExerciseFolderStatsData | null>(null)

export const ExerciseFolderStatsProvider = ExerciseFolderStatsContext.Provider

export function useExerciseFolderStats() {
  return useContext(ExerciseFolderStatsContext)
}
