import { createContext, useContext } from 'react'

import { Instance } from '@/fetcher/graphql-types/operations'

export const LocaleContext = createContext<Instance | undefined>(undefined)

export const LocaleContextProvider = LocaleContext.Provider

export function useLocale() {
  const data = useContext(LocaleContext)
  if (data === undefined) {
    throw new Error('Attempt to use locale context outside of provider!')
  }
  return data
}
