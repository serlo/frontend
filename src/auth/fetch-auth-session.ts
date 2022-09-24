// import { Session } from '@ory/client'
// import Cookies from 'js-cookie'

import type { Session } from '@ory/client'

import { AuthSessionCookie } from './auth-session-cookie'
import { kratos } from '@/auth/kratos'

// TODO: make sure this runs on the user flows, route changes and maybe also browser tab change / refocus

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
