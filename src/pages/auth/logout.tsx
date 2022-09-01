import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { AuthSessionCookie } from '@/auth/auth-session-cookie'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { kratos } from '@/helper/kratos'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Logout />
  </FrontendClientBase>
))

// A maybe better idea would be to put an logout_url as href in the logout button
function Logout() {
  const router = useRouter()
  useEffect(() => {
    kratos.toSession().catch(() => {
      return router.push('/auth/login-check')
    })

    kratos
      .createSelfServiceLogoutFlowUrlForBrowsers()
      .then(({ data }) => {
        kratos
          .submitSelfServiceLogoutFlow(data.logout_token)
          .then(() => {
            AuthSessionCookie.remove()

            return router.push('/api/auth/logout')
          })
          .catch((error: unknown) => {
            return Promise.reject(error)
          })
      })
      .catch((error: unknown) => {
        return Promise.reject(error)
      })
  })

  // To avoid a component that returns null, maybe handle it server side?
  return null
}
