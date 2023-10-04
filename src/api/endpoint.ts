import { serloDomain } from '@/helper/urls/serlo-domain'

export const endpointBaseUrl =
  process.env.NEXT_PUBLIC_ENV === 'local'
    ? 'http://localhost:3001'
    : `https://api.${serloDomain}`

export const endpoint = `https://api.serlo.org/graphql`
