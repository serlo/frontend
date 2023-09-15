import { FrontendClientBase } from '@/components/frontend-client-base'
import { DataWallet } from '@/components/pages/data-wallet'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase noHeaderFooter noContainers>
    <DataWallet />
  </FrontendClientBase>
))
