import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { fetchAndPersistAuthSession } from '@/auth/fetch-auth-session'
import { kratos } from '@/auth/kratos'
import { AxiosError } from '@/auth/types'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useInstanceData } from '@/contexts/instance-context'
import { showToastNotice } from '@/helper/show-toast-notice'

export function Logout({ oauth }: { oauth?: boolean }) {
  const router = useRouter()
  const { strings } = useInstanceData()
  const { logout_challenge } = router.query

  useEffect(() => {
    fetchAndPersistAuthSession().catch(() => {
      return router.push('/')
    })

    const originalPreviousPath = sessionStorage.getItem('previousPathname')

    kratos
      .createSelfServiceLogoutFlowUrlForBrowsers()
      .then(({ data }) => {
        kratos
          .submitSelfServiceLogoutFlow(data.logout_token)
          .then(async () => {
            void fetchAndPersistAuthSession(null)

            if (oauth) {
              if (!logout_challenge) return
              return await router.push(
                `/api/oauth/accept-logout?logout_challenge=${String(
                  logout_challenge
                )}`
              )
            }
            showToastNotice(strings.notices.bye)

            setTimeout(() => {
              // TODO: make sure router.push() also rerenders authed components (e.g. header)
              window.location.href = originalPreviousPath ?? '/'
            }, 1000)

            return
          })
          .catch((error: AxiosError) => {
            return Promise.reject(error)
          })
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          window.location.href = originalPreviousPath ?? '/'
          return
        }
        return Promise.reject(error)
      })
  }, [router, oauth, logout_challenge, strings.notices.bye])

  return <LoadingSpinner text={strings.auth.loggingOut} />
}
