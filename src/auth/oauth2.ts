import {
  // @ts-expect-error outdated types
  ClientCredentials,
  AuthorizationCode,
  OAuthClient,
  Token,
} from 'simple-oauth2'

const config =
  process.env.HYDRA_HOST === undefined
    ? null
    : {
        client: {
          id: process.env.HYDRA_CLIENT_ID!,
          secret: process.env.HYDRA_CLIENT_SECRET!,
        },
        auth: {
          tokenHost: process.env.HYDRA_HOST,
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
