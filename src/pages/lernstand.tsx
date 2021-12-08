import { FrontendClientBase } from '@/components/frontend-client-base'
import { Lernstand } from '@/components/pages/lernstand'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase noHeaderFooter noContainers>
    <Lernstand />
  </FrontendClientBase>
))
