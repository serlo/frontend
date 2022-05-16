import { gql, GraphQLClient } from 'graphql-request'
import useSWR from 'swr'

import { GetCommentsQuery } from './graphql-types/operations'
import { endpoint } from '@/api/endpoint'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'

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

export type GetCommentsNode = Extract<
  GetCommentsQuery['uuid'],
  { threads: any }
>['threads']['nodes'][number]

export function useCommentData(id: number) {
  const client = new GraphQLClient(endpoint)
  const fetcher = () => client.request(query, { id })
  const resp = useSWR<GetCommentsQuery, object>(`comments::${id}`, fetcher, {
    refreshInterval: 10 * 60 * 1000,
  })

  const { data, error } = resp

  const uuid = data?.uuid

  // eslint-disable-next-line no-console
  if (error) console.log(error)

  if (uuid && hasOwnPropertyTs(uuid, 'threads')) {
    const threads = uuid?.threads.nodes

    const activeThreads = threads?.filter((thread) => !thread.archived)
    const archivedThreads = threads?.filter((thread) => thread.archived)

    const commentData = { active: activeThreads, archived: archivedThreads }
    const commentCount = threads?.reduce((acc, thread) => {
      return acc + thread.comments.nodes.length
    }, 0)

    return { commentData, commentCount, error }
  } else {
    return {
      commentData: { active: undefined, archived: undefined },
      commentCount: undefined,
      error,
    }
  }
}
