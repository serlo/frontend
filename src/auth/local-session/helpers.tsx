import Cookies from 'js-cookie'

import type { AuthenticationPayload } from '../auth-provider'
import { localAuthCookieName } from './fetch-and-persist-auth-session'

// helper for checking auth state outside of auth provider
export const checkLoggedIn = () => {
  return Cookies.get(localAuthCookieName) !== undefined
}

export const getAuthPayloadFromLocalCookie = (): AuthenticationPayload => {
  const payload = Cookies.get(localAuthCookieName)
  return payload ? (JSON.parse(payload) as AuthenticationPayload) : null
}
