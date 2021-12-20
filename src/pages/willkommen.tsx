import { FrontendClientBase } from '@/components/frontend-client-base'
import { LenabiWelcome } from '@/components/pages/lenabi-welcome'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <LenabiWelcome />
  </FrontendClientBase>
))
