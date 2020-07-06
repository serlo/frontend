import cookie from 'cookie'

export function useCookie() {
  const value = typeof window === 'undefined' ? '' : document.cookie
  return cookie.parse(value)
}
