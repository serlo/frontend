import NextAuth from 'next-auth'
// eslint-disable-next-line import/no-internal-modules
import KeycloakProvider from 'next-auth/providers/keycloak'

const KEYCLOAK_CLIENT_IDS = {
  development: 'local-openid',
  test: 'local-openid',
  production: 'frontend-nextauth',
}

const KEYCLOAK_CLIENT_ID = KEYCLOAK_CLIENT_IDS[process.env.NODE_ENV]

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
  ],
})
