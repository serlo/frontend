import {
  config as oryConfig,
  createApiHandler,
} from '@ory/integrations/next-edge'

export const config = { ...oryConfig, runtime: 'experimental-edge' }

const KRATOS_HOSTS = {
  production: process.env.KRATOS_HOST_PRODUCTION,
  staging: process.env.KRATOS_HOST_STAGING,
  local: process.env.KRATOS_HOST_LOCAL,
}

const COOKIE_DOMAINS = {
  production: process.env.NEXT_PUBLIC_SERLO_DOMAIN_PRODUCTION,
  staging: process.env.NEXT_PUBLIC_SERLO_DOMAIN_STAGING,
  local: 'localhost',
}

export const KRATOS_HOST = KRATOS_HOSTS[process.env.NEXT_PUBLIC_ENV || 'local']

const COOKIE_DOMAIN =
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? COOKIE_DOMAINS['production']
    : process.env.NEXT_PUBLIC_VERCEL_URL
    ? COOKIE_DOMAINS['staging']
    : COOKIE_DOMAINS['local']

// TODO: this should probably be handled in CF Worker instead since it changes independent of Frontend.
export default createApiHandler({
  apiBaseUrlOverride: KRATOS_HOST,
  forceCookieSecure: false,
  forceCookieDomain: COOKIE_DOMAIN,
})
