import { FrontendClientBase } from '@/components/frontend-client-base'
import { Settings } from '@/components/pages/auth/settings'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Settings />
  </FrontendClientBase>
))
