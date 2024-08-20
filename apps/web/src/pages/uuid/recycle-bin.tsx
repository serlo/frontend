import { faTrashRestore } from '@fortawesome/free-solid-svg-icons'
import { gql } from 'graphql-request'

import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { Link } from '@/components/content/link'
import { PageTitle } from '@/components/content/page-title'
import { FaIcon } from '@/components/fa-icon'
import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { Guard } from '@/components/guard'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { TimeAgo } from '@/components/time-ago'
import { useInstanceData } from '@/contexts/instance-context'
import { loggedInData } from '@/data/de'
import { GetTrashedEntitiesQuery } from '@/fetcher/graphql-types/operations'
import { getTranslatedType } from '@/helper/get-translated-type'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { useSetUuidStateMutation } from '@/mutations/use-set-uuid-state-mutation'

export default renderedPageNoHooks(() => (
  <FrontendClientBase noIndex>
    <Content />
  </FrontendClientBase>
))

function Content() {
  const setUuidState = useSetUuidStateMutation()
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data, error, loadMore, loading } = useFetch()
  const { strings } = useInstanceData()

  return (
    <>
      {renderBackButton()}
      <PageTitle title={strings.pageTitles.recycleBin} headTitle />
      <Guard data={data} error={error} needsAuth>
        <>
          {data ? (
            <>
              {renderTable(data.nodes)} {renderLoadMore()}
            </>
          ) : null}
        </>
      </Guard>
    </>
  )

  function renderLoadMore() {
    if (loading) return <LoadingSpinner noText />
    if (data === undefined || data?.totalCount === data.nodes.length)
      return null

    return (
      <p className="serlo-p mt-8">
        <button onClick={loadMore} className="serlo-button-blue">
          {strings.actions.loadMore}
        </button>
      </p>
    )
  }

  function renderTable(nodes: TrashedEntitiesNode[]) {
    return (
      <table className="serlo-table border-l-3 border-t-3 border-brand-200">
        <thead>
          <tr>
            <th className="serlo-th">ID</th>
            <th className="serlo-th">{strings.bin.title}</th>
            <th className="serlo-th">Type</th>
            <th className="serlo-th">{strings.bin.trashed}</th>
            <th className="serlo-th"></th>
          </tr>
        </thead>
        <tbody>{nodes.map(renderRow)}</tbody>
      </table>
    )
  }

  function renderRow(node: TrashedEntitiesNode) {
    if (!node.entity || !node.dateOfDeletion) return null
    const { id, alias, title, __typename } = node.entity

    return (
      <tr key={id}>
        <td className="serlo-td">
          <Link href={alias}>{id}</Link>
        </td>
        <td className="serlo-td">
          <Link href={alias}>{title}</Link>
        </td>
        <td className="serlo-td">{getTranslatedType(strings, __typename)}</td>
        <td className="serlo-td">
          <TimeAgo datetime={new Date(node.dateOfDeletion)} dateAsTitle />
        </td>
        <td className="serlo-td">
          <button
            title={loggedInData.strings.authorMenu.restoreContent}
            className="serlo-button-blue-transparent text-brand-300"
            onClick={async () => {
              const success = await setUuidState({ id: [id], trashed: false })
              if (success) window.location.href = alias
            }}
          >
            <FaIcon icon={faTrashRestore} />
          </button>
        </td>
      </tr>
    )
  }

  function renderBackButton() {
    return (
      <Breadcrumbs
        data={[{ label: strings.pageTitles.diagon, url: '/backend' }]}
        asBackButton
      />
    )
  }
}

export type TrashedEntitiesNode = NonNullable<
  GetTrashedEntitiesQuery['entity']
>['deletedEntities']['nodes'][0]

function useFetch() {
  return useGraphqlSwrPaginationWithAuth<TrashedEntitiesNode>({
    query: trashedEntitiesQuery,
    variables: { first: 50 },
    config: {
      refreshInterval: 2 * 60 * 1000, // 2min
    },
    getConnection(data: GetTrashedEntitiesQuery) {
      return data.entity?.deletedEntities
    },
  })
}

export const trashedEntitiesQuery = gql`
  query getTrashedEntities($first: Int!, $after: String, $instance: Instance) {
    entity {
      deletedEntities(first: $first, after: $after, instance: $instance) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          dateOfDeletion
          entity {
            id
            alias
            title
            __typename
          }
        }
      }
    }
  }
`
