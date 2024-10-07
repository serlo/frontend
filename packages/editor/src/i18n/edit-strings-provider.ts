import { createContext, useContext } from 'react'

import { EditStrings } from './strings/en/edit'

export const EditStringsContext = createContext<EditStrings | null>(null)

export const EditStringsProvider = EditStringsContext.Provider

export function useEditStrings() {
  const data = useContext(EditStringsContext)

  if (!data) {
    throw new Error('Attempt to use editStrings outside of provider!')
  }

  return data
}
