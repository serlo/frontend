import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import { Token } from 'simple-oauth2'

import { AuthenticationPayload } from './auth-provider'

export function parseAuthCookie(
  refreshToken: (usedToken: string) => Promise<void>,
  clearToken: () => void
): AuthenticationPayload {
  try {
    const cookies = typeof window === 'undefined' ? {} : Cookies.get()

    const { access_token, id_token } = JSON.parse(
      cookies['auth-token']
    ) as Token

    const decoded = jwt_decode<{
      username: string
      id: number
    }>(id_token as string)

    return {
      username: decoded.username,
      id: decoded.id,
      token: access_token as string,
      refreshToken,
      clearToken,
    }
  } catch {
    return null
  }
}
