import { useRouter } from 'next/router'
import { useEffect } from 'react'

import {
  filterUnwantedRedirection,
  loginUrl,
  registrationUrl,
  settingsUrl,
} from './utils'
import { AuthSessionCookie } from '@/auth/cookie/auth-session-cookie'
import { fetchAndPersistAuthSession } from '@/auth/cookie/fetch-and-persist-auth-session'
import { kratos } from '@/auth/kratos'
import { oauthHandler } from '@/auth/oauth-handler'
import { AxiosError } from '@/auth/types'
import { useAuth } from '@/auth/use-auth'
import { useAuthentication } from '@/auth/use-authentication'
import { useCheckInstance } from '@/auth/use-check-instance'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useInstanceData } from '@/contexts/instance-context'
import { showToastNotice } from '@/helper/show-toast-notice'
import { triggerSentry } from '@/helper/trigger-sentry'

export function Logout({ oauth }: { oauth?: boolean }) {
  const router = useRouter()
  const checkInstance = useCheckInstance()
  const { refreshAuth } = useAuth()
  const auth = useAuthentication()
  const { strings } = useInstanceData()
  const { logout_challenge } = router.query

  useEffect(() => {
    checkInstance({ redirect: false })

    const cookieSession = AuthSessionCookie.parse()
    const isSSO = cookieSession?.authentication_methods
      ? cookieSession.authentication_methods[0].method === 'oidc'
      : false

    const redirection = isSSO
      ? 'https://aai.demo.meinbildungsraum.de/realms/nbp-aai/protocol/openid-connect/logout'
      : filterUnwantedRedirection({
          desiredPath: sessionStorage.getItem('previousPathname'),
          unwantedPaths: [settingsUrl, loginUrl, registrationUrl],
        })

    const redirectOnError = () => {
      window.location.href = redirection
      return
    }

    // if they are problems we could add an additional check here
    if (!auth || !cookieSession) return

    kratos
      .createBrowserLogoutFlow()
      .then(({ data }) => {
        kratos
          .updateLogoutFlow({ token: data.logout_token })
          .then(() => {
            void fetchAndPersistAuthSession(refreshAuth, null)

            if (oauth) {
              void oauthHandler('logout', String(logout_challenge))
              return
            }

            showToastNotice(strings.notices.bye)
            void router.push(redirection)
            return
          })
          .catch((error: AxiosError) => {
            // eslint-disable-next-line no-console
            console.error(error)
            triggerSentry({
              message: 'Auth error',
              code: error.response?.status,
            })
            return Promise.reject(error)
          })
      })
      .catch((error: AxiosError) => {
        // eslint-disable-next-line no-console
        console.error(error)
        triggerSentry({ message: 'Auth error', code: error.response?.status })
        if (error.response?.status === 401) {
          return redirectOnError()
        }
        return Promise.reject(error)
      })
  }, [
    router,
    oauth,
    logout_challenge,
    strings.notices.bye,
    refreshAuth,
    auth,
    checkInstance,
  ])

  return <LoadingSpinner text={strings.auth.loggingOut} />
}
