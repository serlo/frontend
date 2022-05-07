import { gql, GraphQLClient } from 'graphql-request'
import useSWR from 'swr'

import {
  GetCommentsQuery,
  GetCommentsThreads_Article_Fragment,
} from './graphql-types/operations'
import { endpoint } from '@/api/endpoint'

const query = gql`
  query getComments($id: Int!) {
    uuid(id: $id) {
      ... on ThreadAware {
        ...getCommentsThreads
      }
    }
  }
  fragment getCommentsThreads on ThreadAware {
    threads(trashed: false) {
      nodes {
        id
        archived
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
`

export type GetCommentsQueryUuid = Exclude<
  GetCommentsQuery['uuid'],
  { __typename?: 'Comment' }
>
export type GetCommentsNode =
  GetCommentsThreads_Article_Fragment['threads']['nodes'][number]

export function useCommentData(id: number) {
  const client = new GraphQLClient(endpoint)
  const fetcher = () => client.request(query, { id })
  const resp = useSWR<GetCommentsQuery, object>(`comments::${id}`, fetcher, {
    refreshInterval: 10 * 60 * 1000,
  })

  const { data, error } = resp

  const uuid = data?.uuid as GetCommentsQueryUuid
  const threads = uuid?.threads.nodes

  const activeThreads = threads?.filter((thread) => !thread.archived)
  const archivedThreads = threads?.filter((thread) => thread.archived)

  const commentData = { active: activeThreads, archived: archivedThreads }
  const commentCount = threads?.reduce((acc, thread) => {
    return acc + thread.comments.nodes.length
  }, 0)

  // eslint-disable-next-line no-console
  if (error) console.log(error)

  return { commentData, commentCount, error }
}
