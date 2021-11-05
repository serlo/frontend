import { User } from '@serlo/authorization'
import { gql } from 'graphql-request'
import { NextPage } from 'next'
import Head from 'next/head'
import { MouseEvent, useState } from 'react'

import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { useAuthentication } from '@/auth/use-authentication'
import { useCanDo } from '@/auth/use-can-do'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { TimeAgo } from '@/components/time-ago'
import { ProfileRoles } from '@/components/user/profile-roles'
import { FrontendContentNode, UserPage } from '@/data-types'
import { convertState } from '@/fetcher/convert-state'
import { sharedUserFragment } from '@/fetcher/user/query'
import { isMac } from '@/helper/client-detection'
import { mutationFetch } from '@/helper/mutations'
import { showToastNotice } from '@/helper/show-toast-notice'
import { renderArticle } from '@/schema/article-renderer'

const ContentPage: NextPage = () => {
  return (
    <FrontendClientBase noHeaderFooter noContainers showNav={false}>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <BotHunt />
    </FrontendClientBase>
  )
}
export default ContentPage

const titles = [
  'Lets play: Bot Or Not?',
  'Welcome to Whac-A-Mole: Serlo Edition',
  'Ready to retire some replicants?',
  'More Human than Human.',
  'Ready for your baseline test KD6-3.7?',
  'You are a robot, right?',
  'BotHunter5000 is ready',
]

const BotHunt = () => {
  const auth = useAuthentication()

  const [removedIds, setRemovedIds] = useState<number[]>([])

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data, error, loadMore } = usePotentialSpamUsersFetch()

  const canDo = useCanDo()
  const canDelete = canDo(User.deleteBot)

  async function remove(id: number) {
    const input = {
      botIds: [id],
    }

    const success = await mutationFetch(auth, mutation, input)
    if (success) {
      setRemovedIds([...removedIds, id])
      showToastNotice(`# ${id} removed 💥`, 'warning')
    } else {
      showToastNotice('sorry, that did not work')
    }
  }

  const randomTitle = titles[Math.floor(Math.random() * titles.length)]

  return (
    <>
      {canDelete ? (
        <Guard data={data} error={error} needsAuth>
          <>
            <div id="logo" dangerouslySetInnerHTML={{ __html: randomTitle }} />
            <ul>{renderLis()}</ul>
            {renderLoadMore()}
          </>
        </Guard>
      ) : (
        <p className="pt-36 text-center w-full">
          sorry, <br />
          authorized personnel only.
        </p>
      )}
      <Style />
    </>
  )

  function renderLis() {
    if (!data) return null
    return data.nodes.map(
      ({
        username,
        id,
        imageUrl,
        lastLogin,
        isActiveAuthor,
        isActiveReviewer,
        isActiveDonor,
        activityByType,
        description,
        motivation,
        roles,
      }) => {
        if (removedIds.includes(id)) return null
        if (isActiveAuthor || isActiveReviewer || isActiveDonor) return null

        const profileUrl = `/user/${id}/${username}`

        return (
          <li key={id}>
            <img
              src={imageUrl}
              alt={`Profile image of ${username}`}
              className="block grayscale hover:grayscale-0"
              style={{ width: 200 }}
            />
            <div className="flex-grow">
              <h2 className="text-xl mb-3 font-bold">
                <a href={profileUrl}>{username}</a>
              </h2>
              <div className="flex w-full justify-between">
                <div className="w-40">
                  <p>
                    Last seen:
                    <br />
                    <b>
                      {lastLogin ? (
                        <TimeAgo datetime={lastLogin} dateAsTitle />
                      ) : (
                        'Never logged in'
                      )}
                    </b>
                    <br />
                    {renderActivityRow('comments', activityByType)}
                    {renderActivityRow('edits', activityByType)}
                    {renderActivityRow('reviews', activityByType)}
                    {renderActivityRow('taxonomy', activityByType)}
                    <br />
                    {renderRoles(roles)}
                  </p>
                </div>
                <div>
                  <>
                    {motivation ? <>&quot;{motivation}&quot;</> : null}
                    <div
                      className="max-h-40 pb-4 overflow-y-auto w-[50rem]"
                      style={{ zoom: '0.8' }}
                    >
                      {renderDescription(description)}
                    </div>
                  </>
                  <br />
                </div>
                <div className="ml-6 text-right buttons">
                  <a href={profileUrl}>Full Profile</a>
                  <br />
                  <br />
                  <br />
                  <p>
                    <a
                      className="cursor-pointer text-red-brand"
                      onClick={(e: MouseEvent) => {
                        if (!e.metaKey && !e.ctrlKey) return false
                        void remove(id)
                      }}
                    >
                      ☠️ Remove
                    </a>
                    <br />
                    {isMac ? '⌘' : 'CTRL'} + click
                  </p>
                </div>
              </div>
            </div>
            <style jsx>{`
              li {
                display: flex;
                flex-grow: 1;
                border-bottom: 1px solid darkgray;
                width: 90vw;
                margin: 0 5vh 5rem 5vh;
                padding-bottom: 5rem;
              }
              li > div {
                min-width: 8rem;
                margin-left: 2rem;
              }
              .buttons a {
                text-decoration: underline;
                &:hover {
                  text-decoration: none;
                }
              }
            `}</style>
          </li>
        )
      }
    )
  }

  function renderActivityRow(
    title: 'comments' | 'edits' | 'reviews' | 'taxonomy',
    activityByType: UserPage['userData']['activityByType']
  ) {
    const number = activityByType[title]
    if (!number) return null
    return (
      <>
        <br />
        {title.charAt(0).toUpperCase() + title.slice(1)}: <b>{number}</b>
      </>
    )
  }

  function renderRoles(roles: UserPage['userData']['roles']) {
    // @ts-expect-error mistreating types here, sorry, not sorry.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const nodes = roles.nodes as UserPage['userData']['roles']

    if (nodes.length === 1) {
      return null
    }

    return (
      <span className="block">
        <ProfileRoles roles={nodes} />
      </span>
    )
  }

  function renderDescription(description?: FrontendContentNode[] | null) {
    const stringDescription = description as unknown as string
    if (!stringDescription || stringDescription === 'NULL') return null
    const desc = convertState(stringDescription)

    return renderArticle(desc)
  }

  function renderLoadMore() {
    return (
      <div className="text-center text-xl mb-12">
        <a
          onClick={loadMore}
          className="cursor-pointer underline hover:no-underline"
        >
          Load more!
        </a>
      </div>
    )
  }
}

const Style = () => (
  <style global jsx>{`
    :root {
      --fg-color: #333;
      --bg-color: #fff;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --fg-color: #ccc;
        --bg-color: #111;
      }
    }

    @media (prefers-color-scheme: light) {
      .grayscale {
        filter: grayscale(0) !important;
      }
    }

    body {
      color: var(--fg-color);
      background: var(--bg-color);
      transition: 0.5s background;
      font-size: 1.1rem;
    }

    h1,
    h2,
    h3,
    h4,
    p {
      color: var(--fg-color) !important;
    }

    body.white {
      background: var(--fg-color);
    }

    #__next {
      font-family: monospace;
    }

    #logo {
      background: url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0' y='0' viewBox='0 0 254.8 230.9' xml:space='preserve'%3E%3Cstyle%3E.st0%7Bfill:%23ccc%7D%3C/style%3E%3Cpath class='st0' d='m103 92-10-8a21 21 0 0 1-20 17 21 21 0 0 1-22-21 21 21 0 0 1 10-18L41 48c-5 7-8 16-8 24 0 7 1 13 3 18 2 6 6 11 10 15 6 6 15 10 26 10h52l-4-7-17-16z'/%3E%3Cpath class='st0' d='m65 65-4 3c-3 3-5 7-5 12 0 4 2 8 5 11s7 5 12 5a16 16 0 0 0 16-15l-5-3c-1 2-4 4-7 4a9 9 0 0 1-7-13l-5-4zm133 15a16 16 0 0 0-8-15l-5 4 1 4c0 5-4 9-8 9-3 0-6-2-7-4l-5 3c1 4 2 7 5 10s7 5 11 5c5 0 9-2 12-5s4-7 4-11zm-4-27c-24 5-46 18-67 30-20-12-42-25-66-30 25 15 53 32 66 59 14-27 42-44 67-59z'/%3E%3Cpath class='st0' d='M127 31C82 29 41 21 0 0c1 120 52 178 127 231 76-53 127-111 128-231-41 21-82 29-128 31zm34 147v-21c8-3 18-10 21-19h-40v44h9l-23 22-24-22h10v-44H73c3 9 13 16 21 19v21c-19-17-38-36-51-58 27 5 57 4 85 4 27 0 57 1 84-4-13 22-32 41-51 58zm66-106c0 7-2 14-4 20s-6 12-11 16c-7 7-17 11-29 11H72c-13 0-22-4-29-11-5-5-9-10-11-16a51 51 0 0 1 5-47c-9-7-16-13-19-18 34 21 69 32 109 33 41-1 76-12 110-33-3 5-10 11-19 18 6 8 9 18 9 27z'/%3E%3Cpath class='st0' d='m194 62 3 3c4 4 6 9 6 15a21 21 0 0 1-21 21 21 21 0 0 1-20-17 178 178 0 0 0-27 24c-2 2-4 4-4 7h52a37 37 0 0 0 36-25 47 47 0 0 0-5-42l-20 14z'/%3E%3C/svg%3E")
        no-repeat;
      width: 50vh;
      height: 50vh;
      max-width: 40vw;
      margin: 25vh auto;
      text-align: center;
      padding-top: 60vh;
    }

    ul {
      margin-top: 5rem;
    }
  `}</style>
)

const mutation = gql`
  mutation deleteBots($input: UserDeleteBotsInput!) {
    user {
      deleteBots(input: $input) {
        success
      }
    }
  }
`

function usePotentialSpamUsersFetch() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  return useGraphqlSwrPaginationWithAuth<UserPage['userData']>({
    query: potentialSpamUsersQuery,
    variables: { first: 20 },
    config: {
      refreshInterval: 10 * 60 * 1000, // 10min
    },
    getConnection(data) {
      return (data.user as { potentialSpamUsers: object }).potentialSpamUsers
    },
  })
}

const potentialSpamUsersQuery = gql`
  query potentialSpamUsers($first: Int!, $after: String) {
    user {
      potentialSpamUsers(first: $first, after: $after) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          ...userData
        }
      }
    }
  }

  ${sharedUserFragment}
`
