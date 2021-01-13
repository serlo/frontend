export const frontendOrigin =
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? // use custom domain for production environment
      'https://frontend.serlo.org'
    : process.env.NEXT_PUBLIC_VERCEL_URL
    ? // use deployment url for staging and previews
      `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : // we are on local deployment
      'http://localhost:3000'
