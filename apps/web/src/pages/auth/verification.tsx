import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { Verification } from '@/components/pages/auth/verification'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Verification />
  </FrontendClientBase>
))
