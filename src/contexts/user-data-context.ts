import React from 'react'

import { FrontendUserData } from '@/data-types'

export const UserDataContext = React.createContext<FrontendUserData | null>(
  null
)

export const UserDataProvider = UserDataContext.Provider

export function useUserData() {
  const data = React.useContext(UserDataContext)
  return data
}
