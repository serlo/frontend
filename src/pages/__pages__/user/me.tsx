import { FrontendClientBase } from '@/components/frontend-client-base'
import { ProfileRedirectMe } from '@/components/pages/user/profile-redirect-me'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <ProfileRedirectMe />
  </FrontendClientBase>
))
