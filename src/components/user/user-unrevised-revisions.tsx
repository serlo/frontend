import { gql } from 'graphql-request'

import { Guard } from '../guard'
import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { UnrevisedEntity } from '@/components/revisions/unrevised-entity'
import { useInstanceData } from '@/contexts/instance-context'
import { UnrevisedEntityData } from '@/fetcher/query-types'
import { unrevisedEntitiesFragment } from '@/fetcher/unrevised-revisions/query'

interface UserUnrevisedRevisionsProps {
  userId: number
  alias?: string
  isOwn: boolean
}

export function UserUnrevisedRevisions({
  userId,
  isOwn,
}: UserUnrevisedRevisionsProps) {
  // This uses SWR for now because we will probably have to move it in the near future
  // and that is a lot easier with the fetch also encapsulated in the component

  const { strings } = useInstanceData()

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data, error, loading } = useUserRevisionsFetch(userId)

  return (
    <Guard data={data?.nodes} error={error}>
      {renderEntries()}
    </Guard>
  )

  function renderEntries() {
    const isEmpty = !loading && data?.nodes.length === 0

    if (isEmpty && !isOwn) return null //only show empty result on own profile

    return (
      <div className="pb-20">
        <h2 className="serlo-h3 mt-20">
          {strings.pageTitles.unrevisedRevisions}
        </h2>
        {data?.nodes.map((entity) => {
          return (
            <UnrevisedEntity isOwn={isOwn} key={entity.id} entity={entity} />
          )
        })}
        {isEmpty && (
          <p className="serlo-p">
            {strings.unrevisedRevisions.noUnrevisedRevisions}
          </p>
        )}
        {loading ? renderSpinner() : null}
      </div>
    )
  }

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
