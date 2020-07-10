import { serloDomain } from '@/helper/serlo-domain'

export function getAuthLink(
  loggedIn: boolean,
  loginTitle: string,
  logoutTitle: string
) {
  if (shouldUseNewAuth()) {
    const authLink = {
      url: '/api/auth/logout',
      title: logoutTitle,
    }
    const noAuthLink = {
      url: '/api/auth/login',
      title: loginTitle,
    }
    return loggedIn ? authLink : noAuthLink
  } else {
    return {
      url: '/auth/login',
      title: loginTitle,
    }
  }
}

export function shouldUseNewAuth() {
  return serloDomain !== 'serlo.org'
}
