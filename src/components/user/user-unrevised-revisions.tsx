import { gql } from 'graphql-request'
import React from 'react'

import { Guard } from '../guard'
import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { UnrevisedEntity } from '@/components/revisions/unrevised-entity'
import { useInstanceData } from '@/contexts/instance-context'
import { UnrevisedEntityData } from '@/fetcher/query-types'
import { unrevisedEntitiesFragment } from '@/fetcher/unrevisedRevisions/query'

interface UserUnrevisedRevisionsProps {
  userId: number
}

export function UserUnrevisedRevisions({
  userId,
}: UserUnrevisedRevisionsProps) {
  const { strings } = useInstanceData()

  // This uses SWR for now because we will probably have to move it in the near future
  // and that is a lot easier with the fetch also encapsulated in the component

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data, error, loading } = useUserRevisionsFetch(userId)

  if (data && data.nodes && data.nodes.length === 0) {
    return null
  }

  return (
    <Guard data={data?.nodes} error={error}>
      <>
        <h3 className="serlo-h3">{strings.pageTitles.unrevisedRevisions}</h3>
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

const userRevisionsQuery = gql`
  query uuid($userId: Int) {
    uuid(id: $userId) {
      ... on User {
        unrevisedEntities {
          ...unrevisedEntitiesData
        }
      }
    }
  }
  ${unrevisedEntitiesFragment}
`
