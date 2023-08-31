import { FrontendClientBase } from '@/components/frontend-client-base'
import { Recovery } from '@/components/pages/auth/recovery'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Recovery />
  </FrontendClientBase>
))
