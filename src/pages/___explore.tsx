import { FrontendClientBase } from '@/components/frontend-client-base'
import { Explore } from '@/components/pages/explore'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase entityId={-1}>
    <Explore />
  </FrontendClientBase>
))
