import { AuthorizationPayload } from '@serlo/authorization'
import {
  createContext,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'

import { AuthSessionCookie } from './auth-session-cookie'
import { useLoggedInComponents } from '@/contexts/logged-in-components'

export interface AuthContextValue {
  authenticationPayload: RefObject<AuthenticationPayload>
  authorizationPayload: AuthorizationPayload | null
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({
  children,
  unauthenticatedAuthorizationPayload,
}: {
  children: ReactNode
  unauthenticatedAuthorizationPayload?: AuthorizationPayload
}) {
  const authenticationPayload = useRef<AuthenticationPayload>(
    getAuthPayloadFromLocalCookie()
  )
  const authorizationPayload = useAuthorizationPayload(
    authenticationPayload,
    unauthenticatedAuthorizationPayload
  )

  return (
    <AuthContext.Provider
      value={{
        authenticationPayload,
        authorizationPayload,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export type AuthenticationPayload = {
  username: string
  id: number
  isEmailVerified: boolean
} | null

function getAuthPayloadFromLocalCookie(): AuthenticationPayload {
  const initialSessionValue = AuthSessionCookie.parse()
  return initialSessionValue
    ? {
        username: (initialSessionValue.identity.traits as { username: string })
          .username,
        id: (
          initialSessionValue.identity.metadata_public as {
            legacy_id: number
          }
        )?.legacy_id,
        // until now users have only one email
        isEmailVerified: (
          initialSessionValue.identity.verifiable_addresses![0] as {
            verified: boolean
          }
        ).verified,
      }
    : null
}

function useAuthorizationPayload(
  authenticationPayload: RefObject<AuthenticationPayload>,
  unauthenticatedAuthorizationPayload?: AuthorizationPayload
) {
  const lc = useLoggedInComponents()

  async function fetchAuthorizationPayload(
    authenticationPayload: RefObject<AuthenticationPayload>
  ): Promise<AuthorizationPayload> {
    if (authenticationPayload.current === null || lc === null) {
      return unauthenticatedAuthorizationPayload ?? {}
    }

    const fetch = lc.createAuthAwareGraphqlFetch(authenticationPayload)
    const data = (await fetch(
      JSON.stringify({
        query: `
          query {
            authorization
          }
        `,
      })
    )) as { authorization: AuthorizationPayload }
    return data.authorization
  }

  const [authorizationPayload, setAuthorizationPayload] =
    useState<AuthorizationPayload | null>(
      unauthenticatedAuthorizationPayload ?? null
    )

  useEffect(() => {
    void fetchAuthorizationPayload(authenticationPayload).then(
      (authorizationPayload) => {
        setAuthorizationPayload(authorizationPayload)
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticationPayload, authenticationPayload.current?.id, lc])

  return authorizationPayload
}
