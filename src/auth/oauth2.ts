import {
  // @ts-expect-error outdated types
  ClientCredentials,
  AuthorizationCode,
  OAuthClient,
  Token,
  AccessToken,
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
        options: {
          authorizationMethod: 'body',
        },
      }

export const scope = ['offline_access', 'openid']

export function getAuthorizationCode() {
  if (config === null) return null
  // @ts-expect-error outdated types
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return new AuthorizationCode(config) as OAuthClient['authorizationCode']
}

export function getClientCredentials() {
  if (config === null) return null
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return new ClientCredentials(config) as {
    createToken(token: Token): AccessToken
  }
}

export function getLogoutUrl({
  idToken,
  state,
  callback,
}: {
  idToken: string
  state: string
  callback: string
}) {
  if (config === null || HYDRA_HOST === undefined) return null
  const query = new URLSearchParams({
    id_token_hint: idToken,
    state: state,
    post_logout_redirect_uri: callback,
  })
  return `${HYDRA_HOST}/oauth2/sessions/logout?${query.toString()}`
}
