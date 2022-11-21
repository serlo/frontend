import { AuthorizationPayload } from '@serlo/authorization'
import { createContext, ReactNode, useEffect, useState } from 'react'

import { AuthSessionCookie } from './auth-session-cookie'
import type { createAuthAwareGraphqlFetch } from '@/api/graphql-fetch'

export interface AuthContextValue {
  authenticationPayload: AuthenticationPayload
  authorizationPayload: AuthorizationPayload | null
  refreshAuth: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({
  children,
  unauthenticatedAuthorizationPayload,
}: {
  children: ReactNode
  unauthenticatedAuthorizationPayload?: AuthorizationPayload
}) {
  const [authenticationPayload, setAuthenticationPayload] = useState(
    getAuthPayloadFromLocalCookie(AuthSessionCookie.get())
  )

  function refreshAuth() {
    setAuthenticationPayload(
      getAuthPayloadFromLocalCookie(AuthSessionCookie.get())
    )
  }

  useEffect(() => {
    const refreshWhenVisible = () => {
      if (document.visibilityState) refreshAuth()
    }
    document.addEventListener('visibilitychange', refreshWhenVisible) //on tab focus change
    window.addEventListener('online', refreshAuth) //on reconnect

    return () => {
      document.addEventListener('visibilitychange', refreshWhenVisible)
      window.removeEventListener('online', refreshAuth)
    }
  })

  const authorizationPayload = useAuthorizationPayload(
    authenticationPayload,
    unauthenticatedAuthorizationPayload
  )

  return (
    <AuthContext.Provider
      value={{
        authenticationPayload,
        authorizationPayload,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export type AuthenticationPayload = {
  username: string
  id: number
} | null

export function getAuthPayloadFromLocalCookie(
  cookie?: string
): AuthenticationPayload {
  const initialSessionValue = AuthSessionCookie.parse({
    [AuthSessionCookie.cookieName]: cookie,
  })
  return initialSessionValue
    ? {
        username: (initialSessionValue.identity.traits as { username: string })
          .username,
        id: (
          initialSessionValue.identity.metadata_public as {
            legacy_id: number
          }
        )?.legacy_id,
      }
    : null
}

function useAuthorizationPayload(
  authenticationPayload: AuthenticationPayload,
  unauthenticatedAuthorizationPayload?: AuthorizationPayload
) {
  async function fetchAuthorizationPayload(
    authenticationPayload: AuthenticationPayload
  ): Promise<AuthorizationPayload> {
    if (authenticationPayload === null) {
      return unauthenticatedAuthorizationPayload ?? {}
    }

    const graphQLFetch = (await import('@/api/graphql-fetch')) as {
      createAuthAwareGraphqlFetch: typeof createAuthAwareGraphqlFetch
    }

    const fetch = graphQLFetch.createAuthAwareGraphqlFetch(
      authenticationPayload
    )
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
  }, [authenticationPayload, authenticationPayload?.id])

  return authorizationPayload
}
