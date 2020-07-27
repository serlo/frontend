import cookie from 'cookie'
import jwt_decode from 'jwt-decode'
import React from 'react'

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
      const { access_token, id_token } = JSON.parse(cookies['auth-token'])
      const { username } = jwt_decode(id_token)
      return { username, token: access_token, refreshToken }
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
