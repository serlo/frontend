import { request } from 'graphql-request'

import { convertState } from '../convert-state'
import { User } from '../query-types'
import { userQuery } from './query'
import { endpoint } from '@/api/endpoint'
import { ErrorPage, UserPage } from '@/data-types'

export async function requestUser(id: number): Promise<UserPage | ErrorPage> {
  const { uuid } = await request<{ uuid: User }>(endpoint, userQuery, {
    id,
  })

  if (uuid.__typename === 'User') {
    const placeholder = JSON.stringify({
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

    const description = uuid.description
      ? uuid.description === 'NULL'
        ? convertState(placeholder)
        : convertState(uuid.description)
      : undefined
    return {
      kind: 'user/profile',
      newsletterPopup: false,
      userData: {
        id: uuid.id,
        username: uuid.username,
        description: description,
        lastLogin: uuid.lastLogin,
        activeReviewer: uuid.activeReviewer,
        activeAuthor: uuid.activeAuthor,
        activeDonor: uuid.activeDonor,
      },
    }
  }

  return {
    kind: 'error',
    errorData: {
      code: 404,
      message: `Something went wrong, this is not a user!`,
    },
  }
}
