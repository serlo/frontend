export const cloudflareWorkerDomain =
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? 'serlo.org'
    : 'serlo-staging.dev'
