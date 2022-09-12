import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { AuthSessionCookie } from '@/auth/auth-session-cookie'
import { kratos } from '@/helper/kratos'

export function Logout({ oauth }: { oauth?: boolean }) {
  const router = useRouter()
  const { logout_challenge } = router.query

  useEffect(() => {
    kratos.toSession().catch(() => {
      return router.push('/auth/login-check')
    })
    const originalPreviousPath = sessionStorage.getItem('previousPathname')

    kratos
      .createSelfServiceLogoutFlowUrlForBrowsers()
      .then(({ data }) => {
        kratos
          .submitSelfServiceLogoutFlow(data.logout_token)
          .then(async () => {
            AuthSessionCookie.remove()

            if (oauth) {
              if (!logout_challenge) return
              return await router.push(
                `/api/oauth/accept-logout?logout_challenge=${String(
                  logout_challenge
                )}`
              )
            }

            window.location.href = `${originalPreviousPath ?? '/'}#auth`
            return
          })
          .catch((error: unknown) => {
            return Promise.reject(error)
          })
      })
      .catch((error: unknown) => {
        return Promise.reject(error)
      })
  }, [router, oauth, logout_challenge])

  return null
}
