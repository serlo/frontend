import { Session } from '@ory/client'
import Cookies from 'js-cookie'

export const AuthSessionCookie = {
  cookieName: 'auth-session',
  get() {
    return Cookies.get(this.cookieName)
  },
  set(session: Session) {
    Cookies.set(this.cookieName, JSON.stringify(session), {
      sameSite: 'Strict',
    })
  },
  remove() {
    Cookies.remove(this.cookieName)
  },
  parse(): Session | null {
    const session = Cookies.get(this.cookieName)
    if (!session) return null
    return JSON.parse(session) as Session
  },
}
