import { gql } from 'graphql-request'
import React, { useEffect, useState } from 'react'

import { PageTitle } from '../content/page-title'
import { Guard } from '../guard'
import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { useAuthentication } from '@/auth/use-authentication'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { UnrevisedEntity } from '@/components/revisions/unrevised-entity'
import { useInstanceData } from '@/contexts/instance-context'
import { UnrevisedEntityData } from '@/fetcher/query-types'
import { unrevisedEntitiesFragment } from '@/fetcher/unrevisedRevisions/query'

interface UserUnrevisedRevisionsProps {
  userId: number
  alias?: string
}

export function UserUnrevisedRevisions({
  userId,
}: UserUnrevisedRevisionsProps) {
  // This uses SWR for now because we will probably have to move it in the near future
  // and that is a lot easier with the fetch also encapsulated in the component

  const { strings } = useInstanceData()
  const auth = useAuthentication()
  const [isOwn, setIsOwn] = useState(false)

  useEffect(() => {
    setIsOwn(auth.current?.id === userId)
  }, [auth, userId])

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data, error, loading } = useUserRevisionsFetch(userId)

  const title = isOwn
    ? strings.pageTitles.myUnrevisedRevisions
    : strings.pageTitles.unrevisedRevisions

  return (
    <Guard data={data?.nodes} error={error}>
      <div className="pb-20">
        <PageTitle title={title} headTitle />
        {data?.nodes.map((entity) => {
          return (
            <UnrevisedEntity isOwn={isOwn} key={entity.id} entity={entity} />
          )
        })}
        {data?.nodes.length === 0 && (
          <p className="serlo-p">
            {strings.unrevisedRevisions.noUnrevisedRevisions}
          </p>
        )}
        {loading ? renderSpinner() : null}
      </div>
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
