import { renderHook } from '@testing-library/react-hooks'
import { gql } from 'graphql-request'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import nodeFetch from 'node-fetch'
import { useRef } from 'react'

import { endpoint } from '@/api/endpoint'
import { useGraphqlSwrWithAuth } from '@/api/use-graphql-swr'
import { UserRoles } from '@/data-types'

const server = setupServer()

global.fetch = (nodeFetch as unknown) as typeof global.fetch

beforeAll(() => {
  server.listen()
})

beforeEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

test('useGraphqlSwrWithAuth', async () => {
  server.use(
    rest.post(endpoint, (req, res, ctx) => {
      return res(
        ctx.json({
          data: {
            uuid: {
              __typename: 'User',
            },
          },
        })
      )
    })
  )
  const { data } = await useGraphqlSwrWithAuthWithMockedAuth({
    query: gql`
      query uuid($id: Int!) {
        uuid(id: $id) {
          __typename
        }
      }
    `,
    variables: {
      id: 1,
    },
  })
  expect(data).toEqual({
    uuid: {
      __typename: 'User',
    },
  })
})

async function useGraphqlSwrWithAuthWithMockedAuth(
  args: Parameters<typeof useGraphqlSwrWithAuth>[0]
) {
  const authHook = renderHook(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useRef({
      username: 'username',
      id: 1,
      roles: [UserRoles.Admin],
      token: 'token',
      async refreshToken() {},
    })
  })
  const { result, waitFor } = renderHook(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useGraphqlSwrWithAuth({
      ...args,
      overrideAuth: authHook.result.current,
    })
  })
  await waitFor(() => {
    return result.current.data !== undefined
  })
  return result.current
}
