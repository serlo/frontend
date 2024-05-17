import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { Login } from '@/components/pages/auth/login'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Login oauth />
  </FrontendClientBase>
))
