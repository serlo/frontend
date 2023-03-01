import { COOKIE_DOMAIN } from '@/auth/cookie/cookie-domain'
import { createApiHandler, config } from '@ory/integrations/next-edge'

export { config }

const KRATOS_HOSTS = {
  production: process.env.KRATOS_HOST_PRODUCTION,
  staging: process.env.KRATOS_HOST_STAGING,
  local: process.env.KRATOS_HOST_LOCAL,
}

// if env is not set, it's a production build running on localhost, use staging as default
const KRATOS_HOST =
  KRATOS_HOSTS[
    process.env.NEXT_PUBLIC_ENV ? process.env.NEXT_PUBLIC_ENV : 'staging'
  ]

// TODO: this should probably be handled in CF Worker instead since it changes independent of Frontend.
export default createApiHandler({
  apiBaseUrlOverride: KRATOS_HOST,
  forceCookieSecure: true,
  forceCookieDomain: COOKIE_DOMAIN,
})
