import React from 'react'

import type { Components } from '@/helper/logged-in-stuff-chunk'

export const LoggedInComponentsContext = React.createContext<
  typeof Components | null
>(null)

export const LoggedInComponentsProvider = LoggedInComponentsContext.Provider

export function useLoggedInComponents() {
  return React.useContext(LoggedInComponentsContext)
}
