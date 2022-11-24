import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { filterUnwantedRedirection } from './utils'
import { AuthSessionCookie } from '@/auth/auth-session-cookie'
import { fetchAndPersistAuthSession } from '@/auth/fetch-auth-session'
import { kratos } from '@/auth/kratos'
import { AxiosError } from '@/auth/types'
import { useAuth } from '@/auth/use-auth'
import { useAuthentication } from '@/auth/use-authentication'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useInstanceData } from '@/contexts/instance-context'
import { showToastNotice } from '@/helper/show-toast-notice'

export function Logout({ oauth }: { oauth?: boolean }) {
  const router = useRouter()
  const { refreshAuth } = useAuth()
  const auth = useAuthentication()
  const { strings } = useInstanceData()
  const { logout_challenge } = router.query

  useEffect(() => {
    const redirection = filterUnwantedRedirection({
      desiredPath: sessionStorage.getItem('previousPathname'),
      unwantedPaths: ['/auth/settings', 'auth/login'],
    })

    const redirectOnError = () => {
      // TODO: reactivate redirect
      // window.location.href = redirection
      return
    }

    // if they are problems we could add an additional check here
    if (!auth || !AuthSessionCookie.get()) return

    kratos
      .createSelfServiceLogoutFlowUrlForBrowsers()
      .then(({ data }) => {
        kratos
          .submitSelfServiceLogoutFlow(data.logout_token)
          .then(async () => {
            void fetchAndPersistAuthSession(refreshAuth, null)

            if (oauth) {
              if (!logout_challenge) return
              return await router.push(
                `/api/oauth/accept-logout?logout_challenge=${String(
                  logout_challenge
                )}`
              )
            }
            showToastNotice(strings.notices.bye)
            void router.push(redirection)
            return
          })
          .catch((error: AxiosError) => {
            // eslint-disable-next-line no-console
            console.error(error)
            return Promise.reject(error)
          })
      })
      .catch((error: AxiosError) => {
        // eslint-disable-next-line no-console
        console.error(error)
        if (error.response?.status === 401) {
          return redirectOnError()
        }
        return Promise.reject(error)
      })
  }, [router, oauth, logout_challenge, strings.notices.bye, refreshAuth, auth])

  return <LoadingSpinner text={strings.auth.loggingOut} />
}
