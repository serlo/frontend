import type { Session } from '@ory/client'
import type { AuthorizationPayload } from '@serlo/authorization'
import { createContext, type ReactNode, useEffect, useState } from 'react'

import { AuthSessionCookie } from './cookie/auth-session-cookie'
import type { createAuthAwareGraphqlFetch } from '@/api/graphql-fetch'
import { isProduction } from '@/helper/is-production'

export type AuthenticationPayload = {
  username: string
  id: number
} | null

export interface AuthContextValue {
  authenticationPayload: AuthenticationPayload
  authorizationPayload: AuthorizationPayload | null
  refreshAuth: (session: Session | null) => void
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
    getAuthPayloadFromLocalCookie()
  )

  function refreshAuth(
    session?: Session | null,
    cookiePayload?: AuthenticationPayload
  ) {
    const newPayload =
      session !== undefined ? getAuthPayloadFromSession(session) : cookiePayload

    if (newPayload === undefined) return

    // careful: when changed this updates most of the components and can reset state in e.g. the editor!
    // use functional update to get the current value of the payload
    // returning same value will skip set state
    setAuthenticationPayload((authenticationPayload) =>
      authenticationPayload?.id !== newPayload?.id
        ? newPayload
        : authenticationPayload
    )
  }

  // check if kratos session still exists (single logout)
  useEffect(() => {
    if (authenticationPayload && !isProduction)
      void (async () => {
        await (
          await import('./cookie/fetch-and-persist-auth-session')
        ).fetchAndPersistAuthSession(refreshAuth)
      })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const refreshWhenVisible = () => {
      if (!document.visibilityState) return

      refreshAuth(undefined, getAuthPayloadFromLocalCookie())

      // check if kratos session still exists (single logout)
      if (authenticationPayload && !isProduction) {
        void (async () => {
          await (
            await import('./cookie/fetch-and-persist-auth-session')
          ).fetchAndPersistAuthSession(refreshAuth)
        })()
      }
    }
    document.addEventListener('visibilitychange', refreshWhenVisible) //on tab focus change
    window.addEventListener('online', () => refreshWhenVisible) //on reconnect

    return () => {
      document.removeEventListener('visibilitychange', refreshWhenVisible)
      window.removeEventListener('online', () => refreshWhenVisible)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

function getAuthPayloadFromLocalCookie(): AuthenticationPayload {
  return getAuthPayloadFromSession(AuthSessionCookie.parse())
}

export function getAuthPayloadFromSession(session: Session | null) {
  return session
    ? {
        username: (session.identity?.traits as { username: string }).username,
        id: (
          session.identity?.metadata_public as {
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
