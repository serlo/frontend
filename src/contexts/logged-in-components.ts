import { createContext, useContext } from 'react'

import type { Components } from '@/helper/logged-in-stuff-chunk'

export const LoggedInComponentsContext = createContext<
  typeof Components | null
>(null)

export const LoggedInComponentsProvider = LoggedInComponentsContext.Provider

export function useLoggedInComponents() {
  return useContext(LoggedInComponentsContext)
}
