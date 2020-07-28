import React from 'react'

import { LoggedInData } from '@/data-types'

export const LoggedInDataContext = React.createContext<LoggedInData | null>(
  null
)

export const LoggedInDataProvider = LoggedInDataContext.Provider

export function useLoggedInData() {
  const data = React.useContext(LoggedInDataContext)
  return data
}
