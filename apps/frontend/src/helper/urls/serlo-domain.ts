export const serloDomain =
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? process.env.NEXT_PUBLIC_SERLO_DOMAIN_PRODUCTION
    : process.env.NEXT_PUBLIC_SERLO_DOMAIN_STAGING
