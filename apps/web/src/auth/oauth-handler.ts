/* eslint-disable no-console */
import { gql } from 'graphql-request'

import { AuthSessionCookie } from './cookie/auth-session-cookie'
import { createAuthAwareGraphqlFetch } from '@/api/graphql-fetch'

type HandlerType = 'login' | 'logout' | 'consent'

const queries: Record<HandlerType, string> = {
  login: gql`
    mutation oauthLogin($input: OauthAcceptInput!) {
      oauth {
        acceptLogin(input: $input) {
          redirectUri
        }
      }
    }
  `,
  consent: gql`
    mutation oauthConsent($input: OauthAcceptInput!) {
      oauth {
        acceptConsent(input: $input) {
          redirectUri
        }
      }
    }
  `,
  logout: gql`
    mutation oauthLogout($challenge: String!) {
      oauth {
        acceptLogout(challenge: $challenge) {
          redirectUri
        }
      }
    }
  `,
}

const throwError = (error?: unknown) => {
  // eslint-disable-next-line no-console
  console.error(error)
  throw new Error('problem in oauth')
}

export const oauthHandler = async (type: HandlerType, challenge?: string) => {
  const session = AuthSessionCookie.parse()

  if (!challenge) throwError('no challenge provided!')

  const variables = {
    input: {
      session,
      challenge,
    },
  }
  const args = JSON.stringify({ query: queries[type], variables })

  try {
    // this is a quick workaround to make sure requests fom localhost get proxied
    // we should probably consider to rework createGraphqlFetch instead
    const dummyAuth = { username: '', id: 0 }
    const response = (await createAuthAwareGraphqlFetch(dummyAuth)(args)) as {
      oauth: {
        acceptLogin?: { redirectUri: string }
        acceptConsent?: { redirectUri: string }
        acceptLogout?: { redirectUri: string }
      }
    }

    const accept =
      type === 'login'
        ? response.oauth.acceptLogin
        : type === 'logout'
          ? response.oauth.acceptLogout
          : response.oauth.acceptConsent

    const redirect = accept!.redirectUri
    if (typeof redirect !== 'string') throwError()

    window.location.href = redirect
  } catch (error) {
    throwError(error)
  }
}
