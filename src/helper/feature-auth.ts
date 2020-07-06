import { faUser } from '@fortawesome/free-solid-svg-icons'

import { serloDomain } from '@/serlo-domain'

export function getAuthLink(loggedIn: boolean) {
  if (shouldUseNewAuth()) {
    const authLink = {
      url: '/api/auth/logout',
      title: 'Abmelden',
      icon: faUser,
    }
    const noAuthLink = {
      url: '/api/auth/login',
      title: 'Anmelden',
      icon: faUser,
    }
    return loggedIn ? authLink : noAuthLink
  } else {
    return {
      url: '/auth/login',
      title: 'Anmelden',
      icon: faUser,
    }
  }
}

export function shouldUseNewAuth() {
  return serloDomain !== 'serlo.org'
}
