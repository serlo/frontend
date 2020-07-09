import { serloDomain } from '@/serlo-domain'

export function getAuthLink(loggedIn: boolean) {
  if (shouldUseNewAuth()) {
    const authLink = {
      url: '/api/auth/logout',
      title: 'Abmelden',
    }
    const noAuthLink = {
      url: '/api/auth/login',
      title: 'Anmelden',
    }
    return loggedIn ? authLink : noAuthLink
  } else {
    return {
      url: '/auth/login',
      title: 'Anmelden',
    }
  }
}

export function shouldUseNewAuth() {
  return serloDomain !== 'serlo.org'
}
