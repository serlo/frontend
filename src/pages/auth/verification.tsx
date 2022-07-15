import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Verification />
  </FrontendClientBase>
))

// Since we will force the user to verify email after registration, this component will just redirect
// In case of other flow, a real UI will be necessary
function Verification() {
  const router = useRouter()
  useEffect(() => {
    void router.push('/auth/login')
  })

  // To avoid a component that returns null, maybe handle it server side?
  return null
}
