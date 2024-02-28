import * as confetti from 'canvas-confetti'
import { type Draft } from 'immer'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect } from 'react'

export interface MathSkillsStorageData {
  name: string
  animal: (typeof animals)[number]
  exercises: Map<
    string,
    { correct: number; incorrect: number; skillLevel: number /* 0-3 */ }
  >
}

export function getEmptyData(): MathSkillsStorageData {
  return { name: '', animal: 'lion', exercises: new Map([]) }
}

export const animals = [
  'lion',
  'crocodile',
  'leopard',
  'monkey',
  'penguin',
  'zebra',
] as const

const storageKey = 'math-skills-data'

export const MathSkillsContext = createContext<{
  data?: MathSkillsStorageData
  updateData: (fn: (arg: Draft<MathSkillsStorageData>) => void) => void
} | null>(null)

export const MathSkillsProvider = MathSkillsContext.Provider

const errorMessage = 'attempted to use uuid data outside of provider!'

export function getStored() {
  if (typeof window === 'undefined') return getEmptyData()
  const data = sessionStorage.getItem(storageKey)
  return data
    ? (JSON.parse(data, mapReviverJson) as MathSkillsStorageData)
    : getEmptyData()
}

export function updateStored(newData: MathSkillsStorageData) {
  sessionStorage.setItem(storageKey, JSON.stringify(newData, mapReplacerJson))
  return newData
}

export function deleteStored() {
  sessionStorage.removeItem(storageKey)
}

export function useMathSkillsStorage() {
  const context = useContext(MathSkillsContext)
  if (context === null) throw new Error(errorMessage)
  return context
}

export function useExerciseData() {
  const context = useContext(MathSkillsContext)
  if (context === null) throw new Error(errorMessage)
  const { data, updateData } = context
  const { query } = useRouter()

  useEffect(() => {}, [data])

  const exerciseKey = String(query.grade) + '/' + String(query.exercise)

  function setExerciseData(isCorrect: boolean) {
    updateData(({ exercises }) => {
      const exercise = exercises.get(exerciseKey)
      if (exercise) {
        const oldLevel = exercise.skillLevel

        exercise.correct += isCorrect ? 1 : 0
        exercise.incorrect += isCorrect ? 0 : 1
        exercise.skillLevel += isCorrect ? 0.1 : 0

        const isNewPoint =
          isCorrect && Math.trunc(oldLevel) < Math.trunc(oldLevel + 0.101)
        if (isNewPoint) {
          try {
            void confetti.default()
          } catch (e) {
            /*🤷*/
          }
        }
      } else {
        exercises.set(exerciseKey, {
          correct: isCorrect ? 1 : 0,
          incorrect: isCorrect ? 0 : 1,
          skillLevel: isCorrect ? 0.1 : 0,
        })
      }
    })
  }

  function getExerciseData(overwriteKey?: string) {
    return (
      data?.exercises.get(overwriteKey ?? exerciseKey) ?? {
        correct: 0,
        incorrect: 0,
        skillLevel: 0,
      }
    )
  }

  return { getExerciseData, setExerciseData }
}

// needed to make map work with JSON.stringify and .parse
function mapReviverJson(key: string, value: { dataType?: 'Map'; value: any }) {
  if (typeof value === 'object' && value !== null && value.dataType === 'Map') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return new Map(value.value)
  }
  return value
}

function mapReplacerJson(key: string, value: any) {
  if (value instanceof Map) return { dataType: 'Map', value: [...value] }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return value
}
