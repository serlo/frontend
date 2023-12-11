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
