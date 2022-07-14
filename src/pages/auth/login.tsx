import { FrontendClientBase } from '@/components/frontend-client-base'
import { Login } from '@/components/pages/login'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Login />
  </FrontendClientBase>
))
