import { useContext } from 'react'

import { AuthContext, AuthContextValue } from './auth-provider'

export function useAuth(): AuthContextValue {
  const contextValue = useContext(AuthContext)

  if (contextValue === null) {
    throw new Error('Attempt to use auth data outside of provider!')
  }

  return contextValue
}
