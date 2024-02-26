import { createContext, useContext } from 'react'

export interface MathSkillsStorageData {
  name: string
  animal: (typeof animals)[number]
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
  updateData: (arg: Partial<MathSkillsStorageData>) => void
} | null>(null)

export const MathSkillsProvider = MathSkillsContext.Provider

const errorMessage = 'attempted to use uuid data outside of provider!'

export function getStored() {
  if (typeof window === 'undefined') return
  return JSON.parse(
    sessionStorage.getItem(storageKey) ?? '{}'
  ) as MathSkillsStorageData
}

export function updateStored(updates: Partial<MathSkillsStorageData>) {
  const updatedData = { ...getStored(), ...updates } as MathSkillsStorageData
  sessionStorage.setItem(storageKey, JSON.stringify(updatedData))
  return updatedData
}

export function deleteStored() {
  sessionStorage.removeItem(storageKey)
}

export function useMathSkillsStorage() {
  const data = useContext(MathSkillsContext)
  if (data === null) throw new Error(errorMessage)
  return data
}
