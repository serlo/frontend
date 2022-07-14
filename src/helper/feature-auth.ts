import { HeaderData } from '@/data-types'

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
            url: '/auth/login',
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
  return true
}
