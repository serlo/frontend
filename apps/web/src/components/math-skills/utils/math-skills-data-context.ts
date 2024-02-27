import { Draft } from 'immer'
import { createContext, useContext } from 'react'

export interface MathSkillsStorageData {
  name: string
  animal: (typeof animals)[number]
}

export function getEmptyData(): MathSkillsStorageData {
  return { name: '', animal: 'lion' }
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
  return JSON.parse(
    sessionStorage.getItem(storageKey) ?? '{}'
  ) as MathSkillsStorageData
}

export function updateStored(newData: MathSkillsStorageData) {
  sessionStorage.setItem(storageKey, JSON.stringify(newData))
  return newData
}

export function deleteStored() {
  sessionStorage.removeItem(storageKey)
}

export function useMathSkillsStorage() {
  const data = useContext(MathSkillsContext)
  if (data === null) throw new Error(errorMessage)
  return data
}
