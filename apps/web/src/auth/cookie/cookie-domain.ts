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
