export function getOrigin() {
  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    // we are on production branch
    return 'https://frontend.serlo.org'
  } else {
    if (process.env.NEXT_PUBLIC_VERCEL_URL) {
      // this is a preview deployment
      return process.env.NEXT_PUBLIC_VERCEL_URL
    } else {
      // local development
      return 'http://localhost:3000'
    }
  }
}
