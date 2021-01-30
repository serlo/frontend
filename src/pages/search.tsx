import { FrontendClientBase } from '@/components/frontend-client-base'
import { Search } from '@/components/pages/search'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Search />
  </FrontendClientBase>
))
