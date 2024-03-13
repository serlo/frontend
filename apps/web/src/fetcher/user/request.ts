import { parseDocumentString } from '@editor/static-renderer/helper/parse-document-string'
import { EditorRowsDocument } from '@editor/types/editor-plugins'
import { AuthorizationPayload, Scope } from '@serlo/authorization'
import { request } from 'graphql-request'

import { userQuery } from './query'
import { User } from '../query-types'
import { endpoint } from '@/api/endpoint'
import { PageNotFound, UserPage, UuidType } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'

export async function requestUser(
  path: string,
  instance: string
): Promise<UserPage | PageNotFound> {
  const { uuid, authorization } = await request<{
    uuid: User
    authorization: AuthorizationPayload
  }>(endpoint, userQuery, {
    path,
    instance,
  })

  if (!uuid || uuid.__typename !== UuidType.User) {
    return { kind: 'not-found' }
  }

  const description =
    !uuid.description || uuid.description === 'NULL'
      ? undefined
      : (parseDocumentString(uuid.description) as EditorRowsDocument)

  return {
    kind: 'user/profile',
    newsletterPopup: false,
    userData: {
      ...uuid,
      motivation: uuid.motivation ?? undefined,
      chatUrl: uuid.chatUrl ?? undefined,
      description,
      roles: uuid.roles.nodes.map((role) => {
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
