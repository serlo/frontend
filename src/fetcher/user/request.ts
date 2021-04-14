import { request } from 'graphql-request'

import { convertState } from '../convert-state'
import { User } from '../query-types'
import { userQuery } from './query'
import { endpoint } from '@/api/endpoint'
import { UserPage } from '@/data-types'

export async function requestUser(
  path: string,
  instance: string
): Promise<UserPage> {
  const { uuid } = await request<{ uuid: User }>(endpoint, userQuery, {
    path,
    instance,
  })

  if (uuid.__typename === 'User') {
    return {
      kind: 'user/profile',
      newsletterPopup: false,
      userData: { ...uuid, description: getDescription(uuid) },
    }
  } else {
    throw 'User not found'
  }
}

function getDescription(uuid: User) {
  if (uuid.description == null) return undefined

  const description =
    uuid.description === 'NULL'
      ? JSON.stringify({
          plugin: 'text',
          state: [
            {
              type: 'p',
              children: {
                text:
                  'This is where we display the description on a the production server.',
              },
            },
          ],
        })
      : uuid.description

  return convertState(description)
}
