import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase noIndex>
    <Content />
  </FrontendClientBase>
))

const featureCookieName = 'useAllowVidisLogin'

function Content() {
  const router = useRouter()
  useEffect(() => {
    activateVidis()
    void router.push('/auth/login')
  }, [router])

  return <LoadingSpinner noText />
}

function activateVidis() {
  Cookies.set(featureCookieName, '1', { expires: 60 })
}

export function isVidisActive() {
  if (typeof window === 'undefined') return false
  return Cookies.get(featureCookieName) === '1'
}
