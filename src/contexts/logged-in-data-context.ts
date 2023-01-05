import { createContext } from 'react'

import { LoggedInData } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { getLoggedInData } from '@/helper/feature-i18n'

export const LoggedInDataContext = createContext<LoggedInData | null>(null)

export const LoggedInDataProvider = LoggedInDataContext.Provider

export function useLoggedInData(): LoggedInData | null {
  return getLoggedInData(Instance.De) as LoggedInData
}
