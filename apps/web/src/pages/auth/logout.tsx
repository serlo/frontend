import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { Logout } from '@/components/pages/auth/logout'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Logout />
  </FrontendClientBase>
))
