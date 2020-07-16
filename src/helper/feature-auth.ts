import { HeaderData } from '@/data-types'
import { authMenuData, noAuthMenuData } from '@/data/menu'
import { serloDomain } from '@/helper/serlo-domain'

export function getAuthData(loggedIn: boolean, loginTitle: string): HeaderData {
  if (shouldUseNewAuth()) {
    return loggedIn ? authMenuData : noAuthMenuData
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
  return serloDomain !== 'serlo.org'
}
