import { AuthorizationPayload } from '@serlo/authorization'
// import Cookies from 'js-cookie'
import {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import { parseAuthCookie } from './parse-auth-cookie'
import { useLoggedInComponents } from '@/contexts/logged-in-components'

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
  token: string
  refreshToken(usedToken: string): Promise<void>
  clearToken(): void
} | null

function useAuthentication(): [RefObject<AuthenticationPayload>, boolean] {
  const initialValue = parseAuthCookie(refreshToken, clearToken)
  const authenticationPayload = useRef<AuthenticationPayload>(initialValue)
  // const pendingRefreshTokenPromise = useRef<Promise<void> | null>(null)

  // const [loggedIn, setLoggedIn] = useState(() => {
  //   return initialValue !== null
  // })
  const loggedIn = true

  // eslint-disable-next-line @typescript-eslint/require-await
  async function refreshToken(_usedToken: string): Promise<void> {
    // async function startRefreshTokenPromise(): Promise<void> {
    //   if (typeof window === 'undefined') return

    //   await fetch('/api/auth/refresh-token', {
    //     method: 'POST',
    //   })

    //   authenticationPayload.current = parseAuthCookie(refreshToken, clearToken)
    //   pendingRefreshTokenPromise.current = null

    return new Promise(() => {
      return
    })

    // const currentCookieValue = parseAuthCookie(refreshToken, clearToken)
    // if (currentCookieValue === null || currentCookieValue.token !== usedToken) {
    //   // Cooke has a newer token than the one we used for the request. So use that instead.
    //   authenticationPayload.current = currentCookieValue
    //   return
    // }

    // if (!pendingRefreshTokenPromise.current) {
    //   // Only initiate the token refresh request if it has not been started already.
    //   pendingRefreshTokenPromise.current = startRefreshTokenPromise()
    // }

    // return pendingRefreshTokenPromise.current
  }

  function clearToken() {
    // if (!loggedIn) return
    // Cookies.remove('auth-token')
    // setLoggedIn(false)
  }

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
