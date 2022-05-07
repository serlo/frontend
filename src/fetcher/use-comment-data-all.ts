import { gql } from 'graphql-request'

import {
  GetAllThreadsQuery,
  GetAllThreadsQueryVariables,
} from './graphql-types/operations'
import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'

const query = gql`
  query getAllThreads($first: Int!, $after: String) {
    thread {
      allThreads(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          archived
          object {
            id
            alias
            __typename
          }
          comments {
            nodes {
              id
              trashed
              content
              archived
              createdAt
              author {
                username
                alias
                id
                isActiveAuthor
                isActiveDonor
                isActiveReviewer
              }
            }
          }
        }
      }
    }
  }
`

export type GetAllThreadsNode =
  GetAllThreadsQuery['thread']['allThreads']['nodes'][number]

export function useCommentDataAll() {
  const resp = useGraphqlSwrPaginationWithAuth<GetAllThreadsNode>({
    query: query,
    variables: { first: 10 } as GetAllThreadsQueryVariables,
    config: {
      refreshInterval: 1 * 60 * 1000, //1min
    },
    getConnection(data) {
      return (data as GetAllThreadsQuery).thread.allThreads
    },
    noAuth: true,
  })

  const { data, error } = resp
  return { commentData: data?.nodes, error, ...resp }
}
