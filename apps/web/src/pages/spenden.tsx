import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase showNav>
    <h1 className="serlo-h1">Spenden</h1>
    <p className="serlo-p">Zur Zeit sind Spenden leider nicht möglich.</p>
  </FrontendClientBase>
))
