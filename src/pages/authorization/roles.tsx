import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons/faMinusCircle'
import clsx from 'clsx'
import { gql } from 'graphql-request'
import { useRef, useState } from 'react'

import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { Link } from '@/components/content/link'
import { PageTitle } from '@/components/content/page-title'
import { FaIcon } from '@/components/fa-icon'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import {
  Role,
  Scope,
  UsersByRoleQuery,
} from '@/fetcher/graphql-types/operations'
import { useUserAddOrRemoveRoleMutation } from '@/helper/mutations/use-user-role-mutation'
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
  const [addRole, removeRole] = useUserAddOrRemoveRoleMutation()
  const usernameInput = useRef<HTMLInputElement>(null)

  const scope = `Serlo_${lang[0].toUpperCase() + lang.slice(1)}` as Scope
  const [showRole, setShowRole] = useState<Role>(Role.Admin)

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data, error, loadMore } = useFetch(scope, showRole)

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const loggedInStrings = loggedInData.strings.subscriptions

  return (
    <>
      {renderBackButton()}
      <PageTitle title={strings.pageTitles.manageRoles} headTitle />
      {renderLoadMore()}
      {renderRolesTabs()}
      <hr className="-mt-4" />
      {renderAddRoleToUser()}
      <hr className="" />
      <Guard data={data} error={error} needsAuth>
        <ul className="mx-side max-w-fit">{renderUsers()}</ul>
      </Guard>
    </>
  )

  function renderAddRoleToUser() {
    return (
      <p className="serlo-p pt-7">
        <input
          ref={usernameInput}
          placeholder="Username"
          className="serlo-input-font-reset serlo-button-light focus:bg-brand-300 focus:text-brand hover:bg-brand-100 focus:outline-none mr-5"
        />
        <button
          className="serlo-button-blue"
          onClick={async () => {
            const username = usernameInput.current?.value
            if (username && username.length > 0) {
              void addRole({ username, role: showRole, scope })
            }
          }}
        >
          <FaIcon icon={faPlusCircle} /> Add as{' '}
          <span className="capitalize">{showRole}</span>
        </button>
      </p>
    )
  }

  function renderRolesTabs() {
    return (
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

  function renderUsers() {
    return data?.nodes.map(({ username }) => {
      return (
        <li
          key={username}
          className="flex justify-between my-3 p-3 -ml-3 hover:bg-brand-50 rounded-md"
        >
          <Link href={`123${username}`}>{username}</Link>
          <span className="ml-3">
            <button
              className=" text-brand-300 hover:text-brand"
              title="remove role"
              onClick={async () => {
                void removeRole({ username, role: showRole, scope })
              }}
            >
              <FaIcon icon={faMinusCircle} />
            </button>
          </span>
        </li>
      )
    })
  }

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
  return useGraphqlSwrPaginationWithAuth<UserByRoleNode>({
    query: usersByRoleQuery,
    variables: { first: 300, scope, role },
    config: {
      refreshInterval: 5 * 60 * 1000, // 5min
    },
    getConnection(data) {
      return (data as UsersByRoleQuery).user.usersByRole
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
