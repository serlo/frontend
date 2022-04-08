import { AuthorizationPayload, Scope } from '@serlo/authorization'
import { GraphQLClient } from 'graphql-request'

import { convertState } from '../convert-state'
import { getSdk, Instance, UserUuidQuery } from '../generated/fetcher-types'
import { endpoint } from '@/api/endpoint'
import { PageNotFound, UserPage } from '@/data-types'

export async function requestUser(
  path: string,
  instance: string
): Promise<UserPage | PageNotFound> {
  const client = new GraphQLClient(endpoint)
  const sdk = getSdk(client)
  const result = await sdk.userUuid({
    path,
    instance: instance as Instance,
  })

  const { uuid } = result
  const authorization = result.authorization as AuthorizationPayload

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

function getDescription(
  uuid: Extract<UserUuidQuery['uuid'], { __typename: 'User' }>
) {
  return uuid.description === null || uuid.description === 'NULL'
    ? undefined
    : convertState(uuid.description)
}
