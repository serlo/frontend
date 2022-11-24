import type { Session } from '@ory/client'
import Cookies from 'js-cookie'

import { COOKIE_DOMAIN } from './kratos'

export const AuthSessionCookie = {
  cookieName: 'auth-session',
  get() {
    return Cookies.get(this.cookieName)
  },
  set(session: Session | null) {
    if (session === null) this.remove()
    else {
      // TODO: is the cookie id problematic to store locally?
      Cookies.set(this.cookieName, JSON.stringify(session), {
        sameSite: 'Strict',
        domain: COOKIE_DOMAIN,
        expires: session.expires_at ? new Date(session.expires_at) : undefined,
      })
    }
  },
  remove() {
    Cookies.remove(this.cookieName, {
      domain: COOKIE_DOMAIN,
      sameSite: 'Strict',
    })
  },
  parse(cookies?: Partial<{ [key: string]: string }>): Session | null {
    const session = cookies
      ? cookies[this.cookieName]
      : Cookies.get(this.cookieName)
    if (!session) return null
    return JSON.parse(session) as Session
  },
}
