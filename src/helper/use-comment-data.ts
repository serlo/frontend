import { ThreadAware } from '@serlo/api'
import { gql, GraphQLClient } from 'graphql-request'
import useSWR from 'swr'

import { endpoint } from '@/api/endpoint'

const query = gql`
  query getComments($id: Int!) {
    uuid(id: $id) {
      ... on ThreadAware {
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
                  activeAuthor
                  activeDonor
                  activeReviewer
                }
              }
            }
          }
        }
      }
    }
  }
`
export function useCommentData(id: number) {
  const client = new GraphQLClient(endpoint)
  const fetcher = () => client.request(query, { id })
  const resp = useSWR<{ uuid: ThreadAware }, object>(
    `comments::${id}`,
    fetcher,
    {
      refreshInterval: 10 * 60 * 1000,
    }
  )

  const { data, error } = resp

  const threads = data?.uuid.threads.nodes

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
