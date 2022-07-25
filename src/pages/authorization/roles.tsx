import clsx from 'clsx'
import { gql } from 'graphql-request'
import { useState } from 'react'

import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import {
  Role,
  Scope,
  UsersByRoleQuery,
} from '@/fetcher/graphql-types/operations'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { replacePlaceholders } from '@/helper/replace-placeholders'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Content />
  </FrontendClientBase>
))

const roles = Object.values(Role) as Array<Role>

function Content() {
  const { lang, strings } = useInstanceData()

  const scope = `Serlo_${lang[0].toUpperCase() + lang.slice(1)}` as Scope
  const [showRole, setShowRole] = useState<Role>(Role.Admin)

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data, error, loadMore } = useFetch(scope, showRole)

  console.log({ data })

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const loggedInStrings = loggedInData.strings.subscriptions

  return (
    <>
      <PageTitle title={strings.pageTitles.manageRoles} headTitle />
      {renderLoadMore()}
      <p className="serlo-p">
        {/* //blur-hack, use https://caniuse.com/#feat=css-focus-visible when supported*/}
        {roles.map((role) => (
          <button
            key={role}
            onPointerUp={(e) => e.currentTarget.blur()}
            onClick={() => setShowRole(role)}
            className={clsx(
              'mr-2 mb-2.5',
              showRole == role ? 'serlo-button-blue' : 'serlo-button-light',
              'capitalize'
            )}
          >
            {role}
          </button>
        ))}
      </p>
      123
      {/* <Guard data={filtered} error={error} needsAuth>
        <>
          {/* <ManageSubscriptions subscriptions={filtered!} /> */}
      {/* </>
      </Guard>} */}
    </>
  )

  function renderLoadMore() {
    if (data === undefined || data?.totalCount === data.nodes.length)
      return null

    return (
      <p className="serlo-p mt-8">
        {replacePlaceholders(loggedInStrings.loadedSentence, {
          loadedCount: data?.nodes.length.toString() || '',
          totalCount: data?.totalCount!.toString() || '',
        })}{' '}
        <a onClick={loadMore} className="serlo-link cursor-pointer">
          {loggedInStrings.loadMoreLink}
        </a>
      </p>
    )
  }
}

export type UserByRoleNode = NonNullable<
  UsersByRoleQuery['user']['usersByRole']['nodes'][0]
>

function useFetch(scope: Scope, role: Role) {
  console.log({ first: 300, scope, role })

  return useGraphqlSwrPaginationWithAuth<UserByRoleNode>({
    query: usersByRoleQuery,
    variables: { first: 300, scope, role },
    config: {
      refreshInterval: 5 * 60 * 1000, // 5min
    },
    getConnection(data: UsersByRoleQuery) {
      return data.user.usersByRole
    },
  })
}

export const usersByRoleQuery = gql`
  query usersByRole($role: Role!, $scope: Scope!, $first: Int, $after: String) {
    user {
      usersByRole(role: $role, scope: $scope, first: $first, after: $after) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          username
          alias
        }
      }
    }
  }
`
