import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAuthentication } from '@/auth/use-authentication'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { loginUrl } from '@/components/pages/auth/utils'
import { renderedPageNoHooks } from '@/helper/rendered-page'

// redirect for route `/user/me`
export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Content />
  </FrontendClientBase>
))

function Content() {
  const auth = useAuthentication()
  const router = useRouter()

  useEffect(() => {
    const url = auth
      ? `/user/profile/${auth.username}${window.location.hash}`
      : loginUrl
    void router.replace(url)
  }, [auth, router])

  return null
}
