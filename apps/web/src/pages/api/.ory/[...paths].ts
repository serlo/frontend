import { createApiHandler, config } from '@ory/integrations/next-edge'

export { config }

const COOKIE_DOMAINS = {
  production: 'serlo.org',
  staging: 'serlo-staging.dev',
  local: 'localhost',
}

export const COOKIE_DOMAIN =
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? COOKIE_DOMAINS['production']
    : process.env.NEXT_PUBLIC_VERCEL_URL
      ? COOKIE_DOMAINS['staging']
      : COOKIE_DOMAINS['local']

const KRATOS_HOSTS = {
  production: 'https://kratos.serlo.org',
  staging: 'https://kratos.serlo-staging.dev',
  local: 'http://localhost:4433',
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
