import { COOKIE_DOMAIN } from '../../../auth/kratos'
import {
  createApiHandler,
  config as oryConfig,
} from '@ory/integrations/next-edge'

export const config = { ...oryConfig, runtime: 'experimental-edge' }

const KRATOS_HOSTS = {
  production: process.env.KRATOS_HOST_PRODUCTION,
  staging: process.env.KRATOS_HOST_STAGING,
  local: process.env.KRATOS_HOST_LOCAL,
}

const KRATOS_HOST = KRATOS_HOSTS[process.env.NEXT_PUBLIC_ENV || 'local']

// TODO: this should probably be handled in CF Worker instead since it changes independent of Frontend.
export default createApiHandler({
  apiBaseUrlOverride: KRATOS_HOST,
  forceCookieSecure: true,
  forceCookieDomain: COOKIE_DOMAIN,
})
