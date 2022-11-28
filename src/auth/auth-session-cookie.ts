import type { Session } from '@ory/client'
import Cookies from 'js-cookie'

import { COOKIE_DOMAIN } from './cookie-domain'

const authCookieName = 'auth-session'
const sharedCookieConfig = {
  sameSite: 'Strict',
  domain: COOKIE_DOMAIN,
} as const

// const isLocalhost =
//   typeof window !== undefined && window.location.hostname === 'localhost'

export const AuthSessionCookie = {
  get() {
    return Cookies.get(authCookieName)
  },
  set(session: Session | null) {
    if (session === null) this.remove()
    else {
      // TODO: is the cookie id problematic to store locally?
      Cookies.set(authCookieName, JSON.stringify(session), {
        ...sharedCookieConfig,
        expires: session.expires_at ? new Date(session.expires_at) : undefined,
      })
    }
  },
  remove() {
    Cookies.remove(authCookieName, sharedCookieConfig)
  },
  parse(cookies?: Partial<{ [key: string]: string }>): Session | null {
    const session = cookies
      ? cookies[authCookieName]
      : Cookies.get(authCookieName)
    if (!session) return null
    return JSON.parse(session) as Session
  },
}
