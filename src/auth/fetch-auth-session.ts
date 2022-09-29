import type { Session } from '@ory/client'

import { AuthSessionCookie } from './auth-session-cookie'
import { kratos } from '@/auth/kratos'

// TODO: when auth consumers update without refresh
// we could run this on route changes and maybe browser tab change / refocus as well?

export async function fetchAndPersistAuthSession(session?: Session | null) {
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
  return session ?? null
}
