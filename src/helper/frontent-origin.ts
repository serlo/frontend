export const frontendOrigin =
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? // we are on production branch
      'https://frontend.serlo.org'
    : // use preview deployment url, else we are on local deployment
      process.env.NEXT_PUBLIC_VERCEL_URL ?? 'http://localhost:3000'
