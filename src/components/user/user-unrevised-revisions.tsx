import { gql } from 'graphql-request'
import React from 'react'

import { Guard } from '../guard'
import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { UnrevisedEntity } from '@/components/revisions/unrevised-entity'
import { useInstanceData } from '@/contexts/instance-context'
import { UnrevisedEntityData } from '@/fetcher/query-types'

interface UserUnrevisedRevisionsProps {
  userId: number
}

export function UserUnrevisedRevisions({
  userId,
}: UserUnrevisedRevisionsProps) {
  const { strings } = useInstanceData()
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data, error, loading } = useUserRevisionsFetch(userId)

  return (
    <Guard data={data?.nodes} error={error}>
      <>
        {data?.nodes.map((entity) => {
          return <UnrevisedEntity key={entity.id} entity={entity} />
        })}
        {loading ? renderSpinner() : null}
      </>
    </Guard>
  )

  function renderSpinner() {
    return <LoadingSpinner text={strings.loading.isLoading} />
  }
}

function useUserRevisionsFetch(userId?: number) {
  return useGraphqlSwrPaginationWithAuth<UnrevisedEntityData>({
    query: userRevisionsQuery,
    variables: {
      userId,
    },
    config: {
      refreshInterval: 1 * 60 * 1000, //1min
    },
    getConnection(data) {
      return (data.uuid as { unrevisedEntities: object }).unrevisedEntities
    },
    noAuth: true,
  })
}

// TODO: merge with existing query (by subjects)

const userRevisionsQuery = gql`
  query uuid($userId: Int) {
    uuid(id: $userId) {
      ... on User {
        unrevisedEntities {
          nodes {
            __typename
            id
            alias
            ... on Applet {
              currentRevision {
                title
                id
              }
              revisions(unrevised: true) {
                nodes {
                  title
                  id
                  author {
                    ...authorData
                  }
                  changes
                  date
                }
              }
            }
            ... on Article {
              currentRevision {
                title
                id
              }
              revisions(unrevised: true) {
                nodes {
                  title
                  id
                  author {
                    ...authorData
                  }
                  changes
                  date
                }
              }
            }
            ... on Course {
              currentRevision {
                title
                id
              }
              revisions(unrevised: true) {
                nodes {
                  title
                  id
                  author {
                    ...authorData
                  }
                  changes
                  date
                }
              }
            }
            ... on CoursePage {
              currentRevision {
                title
                id
              }
              revisions(unrevised: true) {
                nodes {
                  title
                  id
                  author {
                    ...authorData
                  }
                  changes
                  date
                }
              }
            }
            ... on Event {
              currentRevision {
                title
                id
              }
              revisions(unrevised: true) {
                nodes {
                  title
                  id
                  author {
                    ...authorData
                  }
                  changes
                  date
                }
              }
            }
            ... on Exercise {
              currentRevision {
                id
              }
              revisions(unrevised: true) {
                nodes {
                  id
                  author {
                    ...authorData
                  }
                  changes
                  date
                }
              }
            }
            ... on ExerciseGroup {
              currentRevision {
                id
              }
              revisions(unrevised: true) {
                nodes {
                  id
                  author {
                    ...authorData
                  }
                  changes
                  date
                }
              }
            }
            ... on GroupedExercise {
              currentRevision {
                id
              }
              revisions(unrevised: true) {
                nodes {
                  id
                  author {
                    ...authorData
                  }
                  changes
                  date
                }
              }
            }
            ... on Video {
              currentRevision {
                title
                id
              }
              revisions(unrevised: true) {
                nodes {
                  title
                  id
                  author {
                    ...authorData
                  }
                  changes
                  date
                }
              }
            }
            ... on Solution {
              currentRevision {
                id
              }
              solutionRevisions: revisions(unrevised: true) {
                nodes {
                  id
                  author {
                    ...authorData
                  }
                  changes
                  date
                }
              }
            }
          }
          totalCount
        }
      }
    }
  }
  fragment authorData on User {
    id
    username
    isActiveAuthor
    isActiveDonor
    isActiveReviewer
    isNewAuthor
  }
`
