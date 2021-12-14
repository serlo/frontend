import NextAuth from 'next-auth'
// eslint-disable-next-line import/no-internal-modules
import KeycloakProvider from 'next-auth/providers/keycloak'

const KEYCLOAK_CLIENT_IDS = {
  development: 'local-openid',
  test: 'local-openid',
  production: 'frontend-nextauth',
}

const KEYCLOAK_CLIENT_ID = KEYCLOAK_CLIENT_IDS[process.env.NODE_ENV]

const HYDRA_HOSTS = {
  production: process.env.HYDRA_HOST_PRODUCTION,
  staging: process.env.HYDRA_HOST_STAGING,
  local: process.env.HYDRA_HOST_LOCAL,
}
const HYDRA_HOST = HYDRA_HOSTS[process.env.NEXT_PUBLIC_ENV]

const HYDRA_CLIENT_IDS = {
  production: process.env.HYDRA_CLIENT_ID_PRODUCTION,
  staging: process.env.HYDRA_CLIENT_ID_STAGING,
  local: process.env.HYDRA_CLIENT_ID_LOCAL,
}
const HYDRA_CLIENT_ID = HYDRA_CLIENT_IDS[process.env.NEXT_PUBLIC_ENV]

const HYDRA_CLIENT_SECRETS = {
  production: process.env.HYDRA_CLIENT_SECRET_PRODUCTION,
  staging: process.env.HYDRA_CLIENT_SECRET_STAGING,
  local: process.env.HYDRA_CLIENT_SECRET_LOCAL,
}
const HYDRA_CLIENT_SECRET = HYDRA_CLIENT_SECRETS[process.env.NEXT_PUBLIC_ENV]

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default NextAuth({
  theme: {
    colorScheme: 'light',
    brandColor: '#007ec1',
    logo: '/_assets/img/serlo-logo.svg',
  },
  secret: 'mock-secret',
  providers: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    KeycloakProvider({
      id: 'bird',
      name: 'BIRD',
      clientId: KEYCLOAK_CLIENT_ID,
      clientSecret: 'mock-secret',
      issuer: 'https://keycloak.serlo-staging.dev/auth/realms/serlo',
    }),
    {
      id: 'hydra',
      name: 'Hydra',
      type: 'oauth',
      version: '2.0',
      wellKnown:
        'https://hydra.serlo-staging.dev/.well-known/openid-configuration',
      clientId: HYDRA_CLIENT_ID!,
      clientSecret: HYDRA_CLIENT_SECRET!,
      idToken: true,
      authorization: HYDRA_HOST! + '/oauth2/auth',
      token: HYDRA_HOST! + '/oauth2/token',
    },
  ],
})
