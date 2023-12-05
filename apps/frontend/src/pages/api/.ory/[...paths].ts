import { createApiHandler, config } from '@ory/integrations/next-edge'

export { config }

const COOKIE_DOMAINS = {
  production: process.env.NEXT_PUBLIC_SERLO_DOMAIN_PRODUCTION,
  staging: process.env.NEXT_PUBLIC_SERLO_DOMAIN_STAGING,
  local: 'localhost',
}

export const COOKIE_DOMAIN =
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? COOKIE_DOMAINS['production']
    : process.env.NEXT_PUBLIC_VERCEL_URL
    ? COOKIE_DOMAINS['staging']
    : COOKIE_DOMAINS['local']

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

export default createApiHandler({
  apiBaseUrlOverride: KRATOS_HOST,
  forceCookieSecure: true,
  forceCookieDomain: COOKIE_DOMAIN,
})
