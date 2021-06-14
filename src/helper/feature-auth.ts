import Cookies from 'js-cookie'

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
      const cookies = typeof window === 'undefined' ? {} : Cookies.get()
      if (cookies['useFrontend'] == 'always') return true
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
