import type { Session } from '@ory/client'
import Cookies from 'js-cookie'

import { COOKIE_DOMAIN } from './cookie-domain'

const authCookieName = 'auth-session'
const sharedCookieConfig = {
  sameSite: 'Strict',
  domain: COOKIE_DOMAIN,
} as const

export const AuthSessionCookie = {
  get() {
    return Cookies.get(authCookieName)
  },
  set(session: Session | null) {
    if (session === null) this.remove()
    else {
      Cookies.set(authCookieName, JSON.stringify(stripSession(session)), {
        ...sharedCookieConfig,
        expires: session.expires_at ? new Date(session.expires_at) : undefined,
      })
    }
  },
  remove() {
    Cookies.remove(authCookieName, sharedCookieConfig)
  },
  parse(cookies?: Partial<{ [key: string]: string }>): Session | null {
    const session = cookies
      ? cookies[authCookieName]
      : Cookies.get(authCookieName)
    if (!session) return null
    return JSON.parse(session) as Session
  },
}

interface Traits {
  description: string
  email: string
  username: string
}

function stripSession(session: Session): Session {
  const { id, identity, authentication_methods } = session
  if (!identity) return session

  const { id: identityId, schema_id, schema_url } = identity
  const { username, email } = identity.traits as Traits
  const metaDataPublic = identity.metadata_public as Record<string, unknown>
  const legacy_id =
    identity.metadata_public && Object.hasOwn(metaDataPublic, 'legacy_id')
      ? (metaDataPublic.legacy_id as number)
      : undefined

  return {
    id,
    identity: {
      id: identityId,
      schema_id,
      schema_url,
      traits: {
        username,
        email,
      },
      metadata_public: {
        legacy_id,
      },
    },
    authentication_methods,
  }
}
