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

// const AuthSessionCookie = {
//   cookieName: 'auth-session',
//   get() {
//     return Cookies.get(this.cookieName)
//   },
//   set(session: Session) {
//     Cookies.set(this.cookieName, JSON.stringify(session), {
//       sameSite: 'Strict',
//     })
//   },
//   remove() {
//     Cookies.remove(this.cookieName)
//   },
//   parse(cookies?: { [key: string]: string }): Session | null {
//     const session = cookies
//       ? cookies[this.cookieName]
//       : Cookies.get(this.cookieName)
//     if (!session) return null
//     return JSON.parse(session) as Session
//   },
// }
