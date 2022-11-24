import { useRouter } from 'next/router'

import { useAuth } from './use-auth'
import { fetchAndPersistAuthSession } from '@/auth/fetch-auth-session'
import { kratos } from '@/auth/kratos'
import { useInstanceData } from '@/contexts/instance-context'
import { showToastNotice } from '@/helper/show-toast-notice'

export function useLogout() {
  const router = useRouter()
  const { refreshAuth } = useAuth()
  const { strings } = useInstanceData()
  const oauth = undefined
  const { logout_challenge } = router.query

  return () => {
    fetchAndPersistAuthSession(refreshAuth).catch(() => {
      return router.push('/')
    })

    const originalPreviousPath = sessionStorage.getItem('previousPathname')

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
            setTimeout(() => router.push(originalPreviousPath ?? '/'), 1000)
            return
          })
          .catch((error: unknown) => Promise.reject(error))
      })
      .catch((error: unknown) => Promise.reject(error))
  }
}
