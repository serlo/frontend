import { RefObject } from 'react'

import { AuthenticationPayload } from './auth-provider'

export function useAuthentication(): RefObject<AuthenticationPayload> {
  return {
    current: {
      username: 'steff',
      clearToken: () => {},
      id: 32543,
      refreshToken: async (usedToken: string) => {
        console.log(usedToken)
        return Promise.resolve(undefined)
      },
      token: 'longtoken',
    },
  }
}
