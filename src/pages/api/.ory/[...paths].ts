import { COOKIE_DOMAIN } from '@/auth/cookie-domain'
import {
  createApiHandler,
  config as oryConfig,
} from '@ory/integrations/next-edge'
import { KRATOS_HOST } from '@/auth/kratos-host'

export const config = { ...oryConfig, runtime: 'experimental-edge' }

// TODO: this should probably be handled in CF Worker instead since it changes independent of Frontend.
export default createApiHandler({
  apiBaseUrlOverride: KRATOS_HOST,
  forceCookieSecure: true,
  forceCookieDomain: COOKIE_DOMAIN,
})
