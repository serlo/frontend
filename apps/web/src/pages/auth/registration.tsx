import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { Registration } from '@/components/pages/auth/registration'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Registration />
  </FrontendClientBase>
))
