import { FrontendClientBase } from '@/components/frontend-client-base'
import { Registration } from '@/components/pages/registration'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Registration />
  </FrontendClientBase>
))
