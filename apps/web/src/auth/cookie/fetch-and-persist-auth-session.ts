import type { Session } from '@ory/client'

import { AuthSessionCookie } from './auth-session-cookie'
import { kratos } from '@/auth/kratos'

export async function fetchAndPersistAuthSession(
  refreshAuth?: (session: Session | null) => void,
  session?: Session | null
) {
  try {
    const thisSession =
      session === undefined ? (await kratos.toSession()).data : session

    AuthSessionCookie.set(thisSession)
    if (refreshAuth) refreshAuth(thisSession)
    return thisSession
  } catch {
    // user probably not logged in
    AuthSessionCookie.remove()
    if (refreshAuth) refreshAuth(null)
    return null
  }
}
