import { AuthorizationPayload } from '@serlo/authorization'
import { createContext, useContext } from 'react'

export const AuthorizationPayloadContext = createContext<AuthorizationPayload | null>(
  null
)

export const AuthorizationPayloadProvider = AuthorizationPayloadContext.Provider

export function useAuthorizationPayload() {
  return useContext(AuthorizationPayloadContext)
}
