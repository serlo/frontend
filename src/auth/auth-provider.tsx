import { Session } from '@ory/client'
import { AuthorizationPayload } from '@serlo/authorization'
import {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import { AuthSessionCookie } from './auth-session-cookie'
import { useLoggedInComponents } from '@/contexts/logged-in-components'
import { kratos } from '@/helper/kratos'

export interface AuthContextValue {
  loggedIn: boolean
  authenticationPayload: RefObject<AuthenticationPayload>
  authorizationPayload: AuthorizationPayload | null
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const contextValue = useContext(AuthContext)

  if (contextValue === null) {
    throw new Error('Attempt to use auth data outside of provider!')
  }

  return contextValue
}

export function AuthProvider({
  children,
  unauthenticatedAuthorizationPayload,
}: {
  children: ReactNode
  unauthenticatedAuthorizationPayload?: AuthorizationPayload
}) {
  const [authenticationPayload, loggedIn] = useAuthentication()
  const authorizationPayload = useAuthorizationPayload(
    authenticationPayload,
    unauthenticatedAuthorizationPayload
  )

  return (
    <AuthContext.Provider
      value={{
        authenticationPayload,
        authorizationPayload,
        loggedIn,
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

function parseAuthCookie(session: Session): AuthenticationPayload {
  try {
    const username = (session?.identity?.traits as { username: string })
      ?.username
    const legacyId = (
      session?.identity?.metadata_public as { legacy_id: number }
    )?.legacy_id
    return {
      username,
      id: legacyId,
    }
  } catch {
    return null
  }
}

function useAuthentication(): [RefObject<AuthenticationPayload>, boolean] {
  const initialSessionValue = AuthSessionCookie.parse()
  const [, setSession] = useState<Session | null>(initialSessionValue)
  const authenticationPayload = useRef<AuthenticationPayload>( //null
    initialSessionValue
      ? {
          username: (
            initialSessionValue.identity.traits as { username: string }
          ).username,
          id: (
            initialSessionValue.identity.metadata_public as {
              legacy_id: number
            }
          )?.legacy_id,
        }
      : null
  )

  useEffect(() => {
    void (async () => {
      const { data } = await kratos.toSession().catch(() => {
        // user is most likely just not logged in
        AuthSessionCookie.remove()
        return { data: null }
      })
      setSession(data)
      setLoggedIn(data !== null)
      if (data) authenticationPayload.current = parseAuthCookie(data)
    })()
  }, [])

  const [loggedIn, setLoggedIn] = useState(() => {
    return AuthSessionCookie.get() !== undefined
  })

  return [authenticationPayload, loggedIn]
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
