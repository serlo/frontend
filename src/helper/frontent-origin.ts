export const frontendOrigin =
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? // we are on production branch
      'https://frontend.serlo.org'
    : process.env.NEXT_PUBLIC_VERCEL_URL
    ? // use preview deployment url
      `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : //  else we are on local deployment
      'http://localhost:3000'
