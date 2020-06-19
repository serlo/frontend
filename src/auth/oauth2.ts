import {
  // @ts-expect-error outdated types
  ClientCredentials,
  AuthorizationCode,
  OAuthClient,
  Token,
} from 'simple-oauth2'

const HYDRA_HOST =
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? process.env.HYDRA_HOST_PRODUCTION
    : process.env.HYDRA_HOST_STAGING

const HYDRA_CLIENT_ID =
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? process.env.HYDRA_CLIENT_ID_PRODUCTION
    : process.env.HYDRA_CLIENT_ID_STAGING

const HYDRA_CLIENT_SECRET =
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? process.env.HYDRA_CLIENT_SECRET_PRODUCTION
    : process.env.HYDRA_CLIENT_SECRET_STAGING

const config =
  HYDRA_HOST === undefined
    ? null
    : {
        client: {
          id: HYDRA_CLIENT_ID!,
          secret: HYDRA_CLIENT_SECRET!,
        },
        auth: {
          tokenHost: HYDRA_HOST,
          tokenPath: '/oauth2/token',
          revokePath: '/oauth2/revoke',
          authorizePath: '/oauth2/auth',
        },
        http: { json: 'force' },
      }

export function getAuthorizationCode():
  | OAuthClient['authorizationCode']
  | null {
  if (config === null) return null
  // @ts-expect-error outdated types
  return new AuthorizationCode(config)
}

export function getClientCredentials(): {
  createToken(token: Token): Token
} | null {
  if (config === null) return null
  return new ClientCredentials(config)
}
