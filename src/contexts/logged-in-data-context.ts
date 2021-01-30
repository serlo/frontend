import { createContext, useContext } from 'react';

import { LoggedInData } from '@/data-types'

export const LoggedInDataContext = createContext<LoggedInData | null>(
  null
)

export const LoggedInDataProvider = LoggedInDataContext.Provider

export function useLoggedInData() {
  const data = useContext(LoggedInDataContext)
  return data
}
