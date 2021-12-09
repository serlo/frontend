import { FrontendClientBase } from '@/components/frontend-client-base'
import { SingleSignOn } from '@/components/pages/single-sign-on'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase noHeaderFooter noContainers>
    <SingleSignOn />
  </FrontendClientBase>
))
