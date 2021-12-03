import { serloDomain } from '@/helper/serlo-domain'

export const endpointHost =
  process.env.NEXT_PUBLIC_ENV === 'local'
    ? 'http://localhost:3001'
    : `https://api.${serloDomain}`

export const endpointGraphql = `${endpointHost}/graphql`
export const endpointEnmeshed = `${endpointHost}/enmeshed`

// Legacy support
export const endpoint = endpointGraphql
