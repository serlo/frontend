import cookie from 'cookie'
import jwt_decode from 'jwt-decode'
import React from 'react'
import { Token } from 'simple-oauth2'

export function useAuth(): React.RefObject<AuthPayload> {
  // This has to be a ref since token changes when calling `refreshToken`.
  const cookieValue = React.useRef<AuthPayload>(null)
  cookieValue.current = parseAuthCookie()
  return cookieValue

  function parseAuthCookie(): AuthPayload {
    try {
      const cookies = cookie.parse(
        typeof window === 'undefined' ? '' : document.cookie
      )
      const { access_token, id_token } = JSON.parse(
        cookies['auth-token']
      ) as Token
      const decoded = jwt_decode(id_token)

      return {
        username: (decoded as { username: string }).username,
        token: access_token as string,
        refreshToken,
      }
    } catch {
      return null
    }
  }

  async function refreshToken() {
    if (typeof window === 'undefined') return
    await fetch('/api/auth/refresh-token', {
      method: 'POST',
    })
    cookieValue.current = parseAuthCookie()
  }
}

export type AuthPayload = {
  username: string
  token: string
  refreshToken(): Promise<void>
} | null
