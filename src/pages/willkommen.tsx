import { FrontendClientBase } from '@/components/frontend-client-base'
import { LenabiWelcome } from '@/components/pages/lenabi-welcome'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => <Content />)

function Content() {
  return (
    <FrontendClientBase loadLoggedInData>
      <LenabiWelcome />
    </FrontendClientBase>
  )
}
