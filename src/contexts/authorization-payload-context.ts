import { AuthorizationPayload } from '@serlo/api'
import { createContext, useContext } from 'react'

export const AuthorizationPayloadContext = createContext<AuthorizationPayload | null>(
  null
)

export const AuthorizationPayloadProvider = AuthorizationPayloadContext.Provider

export function useAuthorizationPayload() {
  const data = useContext(AuthorizationPayloadContext)
  return data
}
