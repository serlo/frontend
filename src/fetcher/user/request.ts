import { AuthorizationPayload, Scope } from '@serlo/authorization'
import { request } from 'graphql-request'

import { convertState } from '../convert-state'
import { User } from '../query-types'
import { userQuery } from './query'
import { endpoint } from '@/api/endpoint'
import { PageNotFound, UserPage } from '@/data-types'

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

  if (!uuid) {
    return { kind: 'not-found' }
  }

  if (uuid.__typename === 'User') {
    return {
      kind: 'user/profile',
      newsletterPopup: false,
      userData: {
        ...uuid,
        motivation: uuid.motivation ?? undefined,
        chatUrl: uuid.chatUrl ?? undefined,
        description: getDescription(uuid),
        roles: uuid.roles.nodes.map((role) => {
          return {
            role: role.role,
            instance:
              role.scope == null || role.scope === Scope.Serlo
                ? null
                : role.scope.substring('serlo.org:'.length),
          }
        }),
      },
      authorization,
    }
  } else {
    return { kind: 'not-found' }
  }
}

function getDescription(uuid: User) {
  return uuid.description === null || uuid.description === 'NULL'
    ? undefined
    : convertState(uuid.description)
}
