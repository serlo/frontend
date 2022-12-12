import Cookies from 'js-cookie'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { NoLoginTonight } from '@/components/no-login-tonight'
import { Login } from '@/components/pages/auth/login'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    {Cookies.get('allowed2Auth') === '1' ? <Login /> : <NoLoginTonight />}
  </FrontendClientBase>
))
