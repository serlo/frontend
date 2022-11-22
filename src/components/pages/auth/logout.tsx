import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { filterUnwantedRedirection } from './utils'
import { fetchAndPersistAuthSession } from '@/auth/fetch-auth-session'
import { kratos } from '@/auth/kratos'
import { AxiosError } from '@/auth/types'
import { useAuth } from '@/auth/use-auth'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useInstanceData } from '@/contexts/instance-context'
import { showToastNotice } from '@/helper/show-toast-notice'

export function Logout({ oauth }: { oauth?: boolean }) {
  const router = useRouter()
  const { refreshAuth } = useAuth()
  const { strings } = useInstanceData()
  const { logout_challenge } = router.query

  useEffect(() => {
    fetchAndPersistAuthSession(refreshAuth).catch(() => {
      return router.push('/')
    })

    const redirection = filterUnwantedRedirection({
      desiredPath: sessionStorage.getItem('previousPathname'),
      unwantedPaths: ['/auth/settings'],
    })

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
          .catch((error: AxiosError) => Promise.reject(error))
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          window.location.href = redirection
          return
        }
        return Promise.reject(error)
      })
  }, [router, oauth, logout_challenge, strings.notices.bye, refreshAuth])

  return <LoadingSpinner text={strings.auth.loggingOut} />
}
