import * as confetti from 'canvas-confetti'
import { type Draft } from 'immer'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect } from 'react'

import { Animal, animalsData } from './animal-data'
import { getPointsAmount } from './get-points-amount'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export interface ExerciseData {
  correct: number
  incorrect: number
  // 0-300; 100, 200, 300 give you a skill point
  skillCent: number
}

export interface MathSkillsStorageData {
  name: string
  animal: Animal
  startTs?: number
  exercises: Map<string, ExerciseData>
}

export function getEmptyData(): MathSkillsStorageData {
  return {
    name: '',
    animal: randomItemFromArray(Object.keys(animalsData) as Animal[]),
    exercises: new Map([]),
  }
}

const storageKey = 'math-skills-data'
const useLocalKey = 'math-skills-use-local'

export const MathSkillsContext = createContext<{
  data: MathSkillsStorageData
  updateData: (fn: (arg: Draft<MathSkillsStorageData>) => void) => void
} | null>(null)

export const MathSkillsProvider = MathSkillsContext.Provider

const errorMessage = 'attempted to use uuid data outside of provider!'

export function getStored() {
  if (typeof window === 'undefined') return getEmptyData()
  const data = getStorage().getItem(storageKey)
  return data
    ? (JSON.parse(data, mapReviverJson) as MathSkillsStorageData)
    : getEmptyData()
}

export function updateStored(newData: MathSkillsStorageData) {
  getStorage().setItem(storageKey, JSON.stringify(newData, mapReplacerJson))
  return newData
}

export function isUsingLocal() {
  if (typeof window === 'undefined') return false
  return !!localStorage.getItem(useLocalKey)
}

function getStorage() {
  return isUsingLocal() ? localStorage : sessionStorage
}

export function activateLocalStorage() {
  localStorage.setItem(useLocalKey, '1')
  const sessionString = sessionStorage.getItem(storageKey)
  if (!sessionString) return
  localStorage.setItem(storageKey, sessionString)
  sessionStorage.removeItem(storageKey)
}

export function deactivateLocalStorage() {
  localStorage.removeItem(useLocalKey)
  const localString = localStorage.getItem(storageKey)
  if (!localString) return
  sessionStorage.setItem(storageKey, localString)
  localStorage.removeItem(storageKey)
}

export function deleteStored() {
  sessionStorage.removeItem(storageKey)
  localStorage.removeItem(storageKey)
  localStorage.removeItem(useLocalKey)
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

  function setExerciseData(isCorrect: boolean, centAmount = 10) {
    updateData(({ exercises }) => {
      const exercise = exercises.get(exerciseKey)
      if (exercise) {
        // eslint-disable-next-line no-console
        //console.log(exercise.skillCent)
        if (isCorrect) {
          const pointAmount = getPointsAmount(exercise.skillCent)

          const factor = pointAmount >= 2 ? 0.3 : pointAmount >= 1 ? 0.5 : 1
          const centChange = Math.round(centAmount * factor)

          exercise.correct += 1
          exercise.skillCent += centChange

          const newPointAmount = getPointsAmount(exercise.skillCent)
          const celebrateNewPoint = isCorrect && pointAmount < newPointAmount
          if (celebrateNewPoint) setTimeout(confetti.default, 150)
        } else {
          // maybe add removing points
          exercise.incorrect += isCorrect ? 0 : 1
        }
      } else {
        exercises.set(exerciseKey, {
          correct: isCorrect ? 1 : 0,
          incorrect: isCorrect ? 0 : 1,
          skillCent: isCorrect ? centAmount : 0,
        })
      }
    })
  }

  function getExerciseData(overwriteKey?: string) {
    return (
      data.exercises.get(overwriteKey ?? exerciseKey) ?? {
        correct: 0,
        incorrect: 0,
        skillCent: 0,
      }
    )
  }

  function deductPoints(centAmount: number) {
    updateData(({ exercises }) => {
      const exercise = exercises.get(exerciseKey)
      if (exercise) {
        const floor = getPointsAmount(exercise.skillCent) * 100 + 1
        exercise.skillCent = Math.max(floor, exercise.skillCent - centAmount)
      }
    })
  }

  return { getExerciseData, setExerciseData, deductPoints }
}

// needed to make map work with JSON.stringify and .parse
function mapReviverJson(_: string, value: { dataType?: 'Map'; value: any }) {
  if (typeof value === 'object' && value !== null && value.dataType === 'Map') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return new Map(value.value)
  }
  return value
}

function mapReplacerJson(_: string, value: any) {
  if (value instanceof Map) return { dataType: 'Map', value: [...value] }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return value
}
