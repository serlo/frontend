import { gql } from 'graphql-request'

import {
  GetAllThreadsQuery,
  GetAllThreadsQueryVariables,
} from './graphql-types/operations'
import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { useInstanceData } from '@/contexts/instance-context'

const query = gql`
  query getAllThreads(
    $first: Int!
    $after: String
    $instance: Instance
    $subjectId: String
  ) {
    thread {
      allThreads(
        instance: $instance
        first: $first
        after: $after
        subjectId: $subjectId
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          archived
          trashed
          object {
            __typename
            id
            alias
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

export function useCommentDataAll(subjectId?: string) {
  const { lang } = useInstanceData()

  const resp = useGraphqlSwrPaginationWithAuth<GetAllThreadsNode>({
    query: query,
    variables: {
      first: 10,
      instance: lang,
      subjectId,
    } as GetAllThreadsQueryVariables,
    config: {
      refreshInterval: 1 * 60 * 1000, //1min
    },
    getConnection(data) {
      return (data as GetAllThreadsQuery).thread.allThreads
    },
    noAuth: true,
  })

  const { data, error } = resp
  return {
    commentData: data?.nodes.map((node) => {
      const commentNodes = node.comments.nodes.filter(
        (comment) => !comment.trashed
      )
      return {
        ...node,
        comments: { nodes: commentNodes },
      }
    }),
    error,
    ...resp,
  }
}
