// eslint-disable-next-line import/no-internal-modules
import { useSession } from 'next-auth/react'
import { RefObject } from 'react'

import { AuthenticationPayload } from './auth-provider'
import { useAuth } from '@/auth/auth-provider'

export function useAuthentication(): RefObject<AuthenticationPayload> {
  const { authenticationPayload } = useAuth()
  const { data } = useSession()

  if (!data || !data.user?.name) return authenticationPayload

  // otherwise add some mock to sso for lenabi
  return {
    current: {
      username: data.user.name,
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
