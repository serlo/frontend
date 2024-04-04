import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { renderedPageNoHooks } from '@/helper/rendered-page'

// frontend redirect for routes the old form of `/user/${userId}/${username}`
// deployed this will be handled by the cf-worker
export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Content />
  </FrontendClientBase>
))

function Content() {
  const router = useRouter()
  const username = router.query.userslug?.at(-1)
  useEffect(() => {
    const url = `/user/profile/${username}${window.location.hash}`
    void router.replace(url)
  }, [router, username])
  return null
}
