import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { gql } from 'graphql-request'
import { useRef, useState } from 'react'

import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { Link } from '@/components/content/link'
import { PageTitle } from '@/components/content/page-title'
import { FaIcon } from '@/components/fa-icon'
import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { Guard } from '@/components/guard'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import {
  Instance,
  Role,
  UsersByRoleQuery,
} from '@/fetcher/graphql-types/operations'
import { cn } from '@/helper/cn'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { useUserAddOrRemoveRoleMutation } from '@/mutations/use-user-role-mutation'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Content />
  </FrontendClientBase>
))

const roles = [
  Role.Admin,
  Role.Architect,
  Role.Moderator,
  Role.Reviewer,
  Role.StaticPagesBuilder,
  Role.Sysadmin,
]

function Content() {
  const { lang, strings } = useInstanceData()
  const instance = lang
  const setHasRole = useUserAddOrRemoveRoleMutation()
  const usernameInput = useRef<HTMLInputElement>(null)
  const [showRole, setShowRole] = useState<Role>(Role.Admin)
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data, error, loadMore } = useFetch(instance, showRole)
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const loggedInStrings = loggedInData.strings

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
          className="serlo-button-light serlo-input-font-reset mr-5 hover:bg-brand-100 focus:bg-brand-300 focus:text-brand focus:outline-none"
        />
        <button
          className="serlo-button-blue"
          onClick={async () => {
            const username = usernameInput.current?.value
            if (username && username.length > 0) {
              void setHasRole({ username, role: showRole, instance }, true)
            }
          }}
        >
          <FaIcon icon={faPlusCircle} />{' '}
          {replacePlaceholders(loggedInStrings.roles.addButton, {
            role: (
              <span className="capitalize">{renderRoleTitle(showRole)}</span>
            ),
          })}
        </button>
      </p>
    )
  }

  function renderRolesTabs() {
    return (
      <p className="serlo-p">
        {roles.map((role) => {
          return (
            <button
              key={role}
              onClick={() => setShowRole(role)}
              className={cn(
                'mb-2.5 mr-2',
                showRole === role ? 'serlo-button-blue' : 'serlo-button-light',
                'capitalize'
              )}
            >
              {renderRoleTitle(role)}
            </button>
          )
        })}
      </p>
    )
  }
  function renderRoleTitle(role: Role) {
    return `${role.replace(/_/g, ' ')}${
      role === Role.Sysadmin ? ' (global)' : ''
    }`
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
    return data?.nodes.map(({ username, alias }) => {
      return (
        <li
          key={username}
          className="my-3 -ml-3 flex justify-between rounded-md p-3 hover:bg-brand-50"
        >
          <Link href={alias}>{username}</Link>
          <span className="ml-3">
            <button
              className=" text-brand-300 hover:text-brand"
              title="remove role"
              onClick={async () => {
                void setHasRole({ username, role: showRole, instance }, false)
              }}
            >
              <FaIcon icon={faTrash} />
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
        {replacePlaceholders(loggedInStrings.subscriptions.loadedSentence, {
          loadedCount: data?.nodes.length.toString() || '',
          totalCount: data?.totalCount!.toString() || '',
        })}{' '}
        <a onClick={loadMore} className="serlo-link cursor-pointer">
          {loggedInStrings.subscriptions.loadMoreLink}
        </a>
      </p>
    )
  }
}

export type UserByRoleNode = NonNullable<
  UsersByRoleQuery['user']['usersByRole']['nodes'][0]
>

function useFetch(instance: Instance, role: Role) {
  return useGraphqlSwrPaginationWithAuth<UserByRoleNode>({
    query: usersByRoleQuery,
    variables: { first: 300, instance, role },
    config: {
      refreshInterval: 5 * 60 * 1000, // 5min
    },
    getConnection(data) {
      return (data as UsersByRoleQuery).user.usersByRole
    },
  })
}

export const usersByRoleQuery = gql`
  query usersByRole(
    $role: Role!
    $instance: Instance!
    $first: Int
    $after: String
  ) {
    user {
      usersByRole(
        role: $role
        instance: $instance
        first: $first
        after: $after
      ) {
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
