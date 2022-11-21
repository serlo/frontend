import type { Session } from '@ory/client'

import { AuthSessionCookie } from './auth-session-cookie'
import { kratos } from '@/auth/kratos'

export async function fetchAndPersistAuthSession(
  refreshAuth: () => void,
  session?: Session | null
) {
  if (session !== undefined) {
    if (session === null) AuthSessionCookie.remove()
    else AuthSessionCookie.set(session)
  } else {
    await kratos
      .toSession()
      .then(({ data }) => {
        AuthSessionCookie.set(data)
        return data
      })
      .catch(() => {
        // user probably not logged in
        AuthSessionCookie.remove()
      })
  }
  refreshAuth()
  return session ?? null
}
