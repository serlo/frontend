import { gql } from 'graphql-request'
import Head from 'next/head'

import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { Link } from '@/components/content/link'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { TimeAgo } from '@/components/time-ago'
import { useInstanceData } from '@/contexts/instance-context'
import { GetTrashedEntitiesQuery } from '@/fetcher/graphql-types/operations'
import { getTranslatedType } from '@/helper/get-translated-type'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Content />
  </FrontendClientBase>
))

function Content() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data, error, loadMore, loading } = useFetch()
  const { strings } = useInstanceData()

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
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
        <button
          onClick={loadMore}
          className="serlo-button serlo-make-interactive-primary"
        >
          {strings.actions.loadMore}
        </button>
      </p>
    )
  }

  function renderTable(nodes: TrashedEntitiesNode[]) {
    return (
      <table className="serlo-table">
        <thead>
          <tr>
            <th className="serlo-th">ID</th>
            <th className="serlo-th">Alias</th>
            <th className="serlo-th">Type</th>
            <th className="serlo-th">{strings.bin.trashed}</th>
          </tr>
        </thead>
        <tbody>{nodes.map(renderRow)}</tbody>
      </table>
    )
  }

  function renderRow(node: TrashedEntitiesNode) {
    if (!node.entity || !node.dateOfDeletion) return null
    const { id, alias, __typename } = node.entity
    const aliasString = alias ?? ''
    const href = alias ?? `/${id}`

    //replace with title when available: https://github.com/serlo/api.serlo.org/issues/627
    const aliasText =
      aliasString.length > 25 ? ` …${aliasString.slice(-25)}` : aliasString
    return (
      <tr key={id}>
        <td className="serlo-td">
          <Link href={href}>{id}</Link>
        </td>
        <td className="serlo-td">
          <Link href={href}>{aliasText}</Link>
        </td>
        <td className="serlo-td">{getTranslatedType(strings, __typename)}</td>
        <td className="serlo-td">
          <TimeAgo datetime={new Date(node.dateOfDeletion)} dateAsTitle />
        </td>
      </tr>
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
            __typename
          }
        }
      }
    }
  }
`
