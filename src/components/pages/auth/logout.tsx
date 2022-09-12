import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { AuthSessionCookie } from '@/auth/auth-session-cookie'
import { kratos } from '@/helper/kratos'

export function Logout({ oauth }: { oauth?: boolean }) {
  const router = useRouter()
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
              return await router.push('/auth/oauth/logout')
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
  })

  return null
}
