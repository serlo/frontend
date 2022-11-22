import type { Session } from '@ory/client'

import { AuthSessionCookie } from './auth-session-cookie'
import { kratos } from '@/auth/kratos'

export async function fetchAndPersistAuthSession(
  refreshAuth?: (session: Session | null) => void,
  session?: Session | null
) {
  if (session !== undefined) {
    if (session === null) AuthSessionCookie.remove()
    else AuthSessionCookie.set(session)
    if (refreshAuth) refreshAuth(session)
  } else {
    await kratos
      .toSession()
      .then(({ data }) => {
        AuthSessionCookie.set(data)
        if (refreshAuth) refreshAuth(data)
        return data
      })
      .catch(() => {
        // user probably not logged in
        AuthSessionCookie.remove()
        if (refreshAuth) refreshAuth(null)
      })
  }
  return session ?? null
}
