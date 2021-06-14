import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import * as React from 'react'
import { Token } from 'simple-oauth2'

export function useAuthentication(): React.RefObject<AuthenticationPayload> {
  // This has to be a ref since token changes when calling `refreshToken`.
  const cookieValue = React.useRef<AuthenticationPayload>(null)
  cookieValue.current = parseAuthCookie()
  return cookieValue

  function parseAuthCookie(): AuthenticationPayload {
    try {
      const cookies = typeof window === 'undefined' ? {} : Cookies.get()

      const { access_token, id_token } = JSON.parse(
        cookies['auth-token']
      ) as Token
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const decoded = jwt_decode(id_token) as { username: string; id: number }

      return {
        username: decoded.username,
        id: decoded.id,
        token: access_token as string,
        refreshToken,
      }
    } catch {
      return null
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async function refreshToken() {
    if (typeof window === 'undefined') return
    Cookies.remove('auth-token')

    window.location.reload()

    /*const response = await fetch('/api/auth/refresh-token', {
      method: 'POST',
    })*/

    cookieValue.current = parseAuthCookie()
  }
}

export type AuthenticationPayload = {
  username: string
  id: number
  token: string
  refreshToken(): Promise<void>
} | null
