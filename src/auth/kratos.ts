import { Configuration as KratosConfig, V0alpha2Api } from '@ory/client'

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

export const kratos = new V0alpha2Api(
  new KratosConfig({
    basePath: `/api/.ory`,
  })
)
