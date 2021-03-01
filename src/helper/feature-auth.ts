import cookie from 'cookie'

import { HeaderData } from '@/data-types'
import { serloDomain } from '@/helper/serlo-domain'

export function getAuthData(
  loggedIn: boolean,
  loginTitle: string,
  authMenu?: HeaderData
): HeaderData | undefined {
  if (shouldUseNewAuth()) {
    return loggedIn
      ? authMenu
      : [
          {
            url: '/api/auth/login',
            title: loginTitle,
            icon: 'login',
          },
        ]
  } else {
    return [
      {
        url: '/auth/login',
        title: loginTitle,
        icon: 'user',
      },
    ]
  }
}

export function shouldUseNewAuth() {
  if (serloDomain !== 'serlo.org') {
    return true
  } else {
    try {
      const cookies = cookie.parse(
        typeof window === 'undefined' ? '' : document.cookie
      )
      const prob = parseFloat(cookies['useFrontend'])
      if (prob === 0) {
        return true
      }
    } catch (e) {
      // ignore
    }
  }
  return false
}
