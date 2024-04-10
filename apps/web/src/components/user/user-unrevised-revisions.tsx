import { gql } from 'graphql-request'

import { Guard } from '../guard'
import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { UnrevisedEntity } from '@/components/revisions/unrevised-entity'
import { useInstanceData } from '@/contexts/instance-context'
import { UsersRevisionsQuery } from '@/fetcher/graphql-types/operations'
import { unrevisedEntitiesFragment } from '@/fetcher/unrevised-revisions/query'

interface UserUnrevisedRevisionsProps {
  username: string
  isOwn: boolean
}

export function UserUnrevisedRevisions({
  username,
  isOwn,
}: UserUnrevisedRevisionsProps) {
  const { strings } = useInstanceData()

  const { data, error, loading } = useUserRevisionsFetch(username)

  return (
    <Guard data={data?.nodes} error={error}>
      {renderEntries()}
    </Guard>
  )

  function renderEntries() {
    if (!data?.nodes) return null
    const { nodes } = data
    const isEmpty = !loading && nodes.length === 0
    if (isEmpty && !isOwn) return null //only show empty result on own profile

    return (
      <div className="pb-20">
        <h2 className="serlo-h3 mt-20">
          {strings.pageTitles.unrevisedRevisions}
        </h2>

        {nodes.map((entity) => (
          <UnrevisedEntity isOwn={isOwn} key={entity.id} entity={entity} />
        ))}
        {isEmpty && (
          <p className="serlo-p">
            {strings.unrevisedRevisions.noUnrevisedRevisions}
          </p>
        )}
        {loading ? <LoadingSpinner text={strings.loading.isLoading} /> : null}
      </div>
    )
  }
}

type DefinedUsersRevisions = Extract<
  UsersRevisionsQuery['user']['userByUsername'],
  { unrevisedEntities: any }
>
type UsersRevision = DefinedUsersRevisions['unrevisedEntities']['nodes'][number]

function useUserRevisionsFetch(username?: string) {
  return useGraphqlSwrPaginationWithAuth<UsersRevision>({
    query: usersRevisionsQuery,
    variables: { username },
    config: { refreshInterval: 1 * 60 * 1000 }, //1min
    // @ts-expect-error not sure about this one
    getConnection(data?: UsersRevisionsQuery) {
      return data?.user?.userByUsername?.unrevisedEntities
    },
    noAuth: true,
  })
}

const usersRevisionsQuery = gql`
  query usersRevisions($username: String!) {
    user {
      userByUsername(username: $username) {
        unrevisedEntities {
          ...unrevisedEntitiesData
        }
      }
    }
  }
  ${unrevisedEntitiesFragment}
`
