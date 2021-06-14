import cookie from 'cookie'
import jwt_decode from 'jwt-decode'
import * as React from 'react'
import { Token } from 'simple-oauth2'

import { UserRoles } from '@/data-types'

export function useAuthentication(): React.RefObject<AuthenticationPayload> {
  // This has to be a ref since token changes when calling `refreshToken`.
  const cookieValue = React.useRef<AuthenticationPayload>(null)
  cookieValue.current = parseAuthCookie()
  return cookieValue

  function parseAuthCookie(): AuthenticationPayload {
    try {
      const cookies = cookie.parse(
        typeof window === 'undefined' ? '' : document.cookie
      )
      const { access_token, id_token } = JSON.parse(
        cookies['auth-token']
      ) as Token
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const decoded = jwt_decode(id_token) as { username: string; id: number }

      return {
        username: decoded.username,
        id: decoded.id,
        roles: [UserRoles.Admin, UserRoles.Login],
        token: access_token as string,
        refreshToken,
      }
    } catch {
      return null
    }
  }

  async function refreshToken() {
    if (typeof window === 'undefined') return
    const response = await fetch('/api/auth/refresh-token', {
      method: 'POST',
    })
    if (response.status == 500) {
      // refresh failed
      window.location.reload()
    }
    cookieValue.current = parseAuthCookie()
  }
}

export type AuthenticationPayload = {
  username: string
  id: number
  roles: UserRoles[]
  token: string
  refreshToken(): Promise<void>
} | null
