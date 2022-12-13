import { AuthSessionCookie } from './auth-session-cookie'

// helper for checking auth state outside of auth provider
export const checkLoggedIn = () => {
  return AuthSessionCookie.get() !== undefined
}
