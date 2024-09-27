import { createContext, useContext } from 'react'

import { StaticStrings } from './strings/en/static'

const StaticStringsContext = createContext<StaticStrings | null>(null)

export const StaticStringsProvider = StaticStringsContext.Provider

export function useStaticStrings() {
  const data = useContext(StaticStringsContext)

  if (!data) {
    throw new Error('Attempt to use staticStrings outside of provider!')
  }

  return data
}
