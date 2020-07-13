import jwt_decode from 'jwt-decode'

import { useCookie } from '@/cookie'

export function useAuth(): AuthPayload {
  const cookies = useCookie()
  try {
    const { id_token } = JSON.parse(cookies['auth-token'])
    const { username } = jwt_decode(id_token)
    return { username }
  } catch {
    return null
  }
}

export type AuthPayload = {
  username: string
} | null
