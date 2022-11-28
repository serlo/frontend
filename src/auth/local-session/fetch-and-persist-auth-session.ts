import type { Session } from '@ory/client'
import Cookies from 'js-cookie'

import { getAuthPayloadFromSession } from '../auth-provider'
import { COOKIE_DOMAIN } from '../cookie-domain'
import { kratos } from '@/auth/kratos'

export const localAuthCookieName = 'auth-session'
const sharedCookieConfig = {
  sameSite: 'Strict',
  domain: COOKIE_DOMAIN,
} as const

export async function fetchAndPersistAuthSession(
  refreshAuth?: (session: Session | null) => void,
  session?: Session | null
) {
  try {
    const thisSession =
      session === undefined ? (await kratos.toSession()).data : session

    writeToCookie(thisSession)
    if (refreshAuth) refreshAuth(thisSession)
    return thisSession
  } catch {
    // user probably not logged in
    removeCookie()
    if (refreshAuth) refreshAuth(null)
    return null
  }

  function writeToCookie(session: Session | null) {
    if (session === null) removeCookie()
    else {
      const payload = getAuthPayloadFromSession(session)
      Cookies.set(localAuthCookieName, JSON.stringify(payload), {
        ...sharedCookieConfig,
        expires: session.expires_at ? new Date(session.expires_at) : undefined,
      })
    }
  }

  function removeCookie() {
    Cookies.remove(localAuthCookieName, sharedCookieConfig)
  }
}
