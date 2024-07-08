import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { features } from '@/components/user/profile-experimental'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase noIndex>
    <Content />
  </FrontendClientBase>
))

function Content() {
  const router = useRouter()
  useEffect(() => {
    Cookies.set(features['authVidis'].cookieName, '1', { expires: 60 })

    void router.push('/auth/login')
  }, [router])

  return <LoadingSpinner noText />
}
