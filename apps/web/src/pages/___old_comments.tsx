import { GraphQLClient, gql } from 'graphql-request'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { endpoint } from '@/api/endpoint'
import { useAuthentication } from '@/auth/use-authentication'
import { CommentAreaAllThreadsThread } from '@/components/comments/comment-area-all-threads-thread'
import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import data from '@/data/old_comment_ids.json'
import {
  CommentStatus,
  GetCommentsForOldCommentsQuery,
} from '@/fetcher/graphql-types/operations'
import { GetAllThreadsNode } from '@/fetcher/use-comment-data-all'

const ContentPage: NextPage = () => {
  return (
    <FrontendClientBase
      noHeaderFooter
      noContainers
      showNav={false}
      authorization={{}}
    >
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <OldComments />
    </FrontendClientBase>
  )
}
export default ContentPage

const query = gql`
  query getCommentsForOldComments($id: Int!) {
    uuid(id: $id) {
      ... on ThreadAware {
        ...getCommentsThreadsOldComments
      }
    }
  }
  fragment getCommentsThreadsOldComments on ThreadAware {
    threads(trashed: false) {
      nodes {
        id
        archived
        status
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
`

function OldComments() {
  const [group, setGroup] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const auth = useAuthentication()

  const [threads, setThreads] = useState<
    {
      __typename?: 'Thread' | undefined
      id: string
      archived: boolean
      status: CommentStatus
      comments: {
        __typename?: 'CommentConnection' | undefined
        nodes: {
          __typename?: 'Comment' | undefined
          id: number
          trashed: boolean
          content: string
          archived: boolean
          createdAt: string
          author: {
            __typename?: 'User' | undefined
            username: string
            alias: string
            id: number
            isActiveAuthor: boolean
            isActiveDonor: boolean
            isActiveReviewer: boolean
          }
        }[]
      }
    }[]
  >([])

  useEffect(() => {
    void (async () => {
      if (group >= 0) {
        setIsLoading(true)
        setProgress(0)

        const comments = []

        for (const uuid of data[group]) {
          const client = new GraphQLClient(endpoint)
          const result: GetCommentsForOldCommentsQuery = await client.request(
            query,
            {
              id: uuid,
            }
          )
          if (result.uuid && Object.hasOwn(result.uuid, 'threads')) {
            // eslint-disable-next-line no-console
            console.log(result.uuid.threads.nodes)
            comments.push(result.uuid.threads.nodes)
          } else {
            comments.push([])
          }
          setProgress(comments.length / data[group].length)
        }

        const thr: typeof threads = []

        comments.forEach((nodes) => {
          nodes.forEach((thread) => {
            if (thread.status === CommentStatus.NoStatus || !thread.archived) {
              thr.push(thread)
            }
          })
        })

        setThreads(thr)

        setIsLoading(false)
      } else {
        setThreads([])
      }
    })()
  }, [group])

  if (!auth) return <>Bitte anmelden</>

  return (
    <div className="mx-auto mt-4 max-w-[900px]">
      <h1 className="serlo-h1">Alte Kommentare sortieren</h1>
      <select
        className="mx-side mb-10 border"
        value={group}
        disabled={isLoading}
        onChange={(e) => {
          setGroup(parseInt(e.target.value))
        }}
      >
        <option value="-1">Bitte Seite auswählen</option>
        {data.map((_, i) => (
          <option value={i} key={i}>
            Seite {i + 1}
          </option>
        ))}
      </select>
      <div className="mx-side">
        {isLoading ? (
          <div>
            Daten werden geladen, bitte einen Moment Geduld. Fortschritt:{' '}
            {Math.round(progress * 100)}%
          </div>
        ) : (
          <>
            {threads.map((thread) => (
              <div key={thread.id}>
                <CommentAreaAllThreadsThread
                  thread={thread as GetAllThreadsNode}
                  onMutate={() => {}}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
