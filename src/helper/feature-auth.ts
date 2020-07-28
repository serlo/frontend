import { HeaderData } from '@/data-types'
import { noAuthMenuData } from '@/data/menu'
import { serloDomain } from '@/helper/serlo-domain'

export function getAuthData(
  loggedIn: boolean,
  loginTitle: string,
  authMenu?: HeaderData
): HeaderData | undefined {
  if (shouldUseNewAuth()) {
    return loggedIn ? authMenu : noAuthMenuData
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
