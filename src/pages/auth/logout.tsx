import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { kratos } from '@/helper/kratos'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Logout />
  </FrontendClientBase>
))

// A better idea may be to put an logout_url as href in the logout button
function Logout() {
  const router = useRouter()
  useEffect(() => {
    kratos
      .createSelfServiceLogoutFlowUrlForBrowsers()
      .then(({ data }) => {
        kratos
          .submitSelfServiceLogoutFlow(data.logout_token)
          .then(() => {
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
  return null
}
