export const endpoint =
  process.env.NEXT_PUBLIC_ENV === 'local'
    ? 'http://localhost:3001/graphql'
    : `https://api.serlo.org/graphql`
