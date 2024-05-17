import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { oauthHandler } from '@/auth/oauth-handler'
import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Consent />
  </FrontendClientBase>
))

function Consent() {
  const router = useRouter()
  const { consent_challenge } = router.query
  useEffect(() => {
    if (!router.isReady || !consent_challenge) {
      return
    }
    // Skip consent because OAuth is only used internally at the moment
    void oauthHandler('consent', String(consent_challenge))

    return
  }, [router.isReady, consent_challenge])

  return <LoadingSpinner noText />
}
