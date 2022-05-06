import { Thread } from '@serlo/api'
import { gql } from 'graphql-request'

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
export function useCommentDataAll() {
  const resp = useGraphqlSwrPaginationWithAuth<Thread>({
    query: query,
    variables: { first: 10 },
    config: {
      refreshInterval: 1 * 60 * 1000, //1min
    },
    getConnection(data) {
      return (data.thread as { allThreads: object }).allThreads
    },
    noAuth: true,
  })

  const { data, error } = resp
  return { commentData: data?.nodes, error, ...resp }
}
