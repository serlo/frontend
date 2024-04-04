import { parseDocumentString } from '@editor/static-renderer/helper/parse-document-string'
import { EditorRowsDocument } from '@editor/types/editor-plugins'
import { AuthorizationPayload, Scope } from '@serlo/authorization'
import { request } from 'graphql-request'

import { userByUsernameQuery } from './query-by-username'
import { User } from '../query-types'
import { endpoint } from '@/api/endpoint'
import { PageNotFound, UserPage } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'

export async function requestUserByUsername(
  username: string
): Promise<UserPage | PageNotFound> {
  const { user, authorization } = await request<{
    user: { userByUsername: User }
    authorization: AuthorizationPayload
  }>(endpoint, userByUsernameQuery, {
    username,
  })
  const userData = user?.userByUsername
  if (!userData) return { kind: 'not-found' }

  const description =
    !userData.description || userData.description === 'NULL'
      ? undefined
      : (parseDocumentString(userData.description) as EditorRowsDocument)

  return {
    kind: 'user/profile',
    newsletterPopup: false,
    userData: {
      ...userData,
      motivation: userData.motivation ?? undefined,
      chatUrl: userData.chatUrl ?? undefined,
      description,
      roles: userData.roles.nodes.map((role) => {
        return {
          role: role.role,
          instance:
            !role.scope || role.scope === Scope.Serlo
              ? null
              : (role.scope.substring('serlo.org:'.length) as Instance),
        }
      }),
    },
    authorization,
  }
}
