import { User } from '@serlo/authorization'
import { gql } from 'graphql-request'
import { NextPage } from 'next'
import Head from 'next/head'
import React, { ChangeEvent, MouseEvent, useState } from 'react'

import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { useAuthentication } from '@/auth/use-authentication'
import { useCanDo } from '@/auth/use-can-do'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { UserPage } from '@/data-types'
import { sharedUserFragment } from '@/fetcher/user/query'
import { mutationFetch } from '@/helper/mutations'
import { showToastNotice } from '@/helper/show-toast-notice'

const ContentPage: NextPage = () => {
  return (
    <FrontendClientBase noHeaderFooter noContainers showNav={false}>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <ReplicantHunt />
    </FrontendClientBase>
  )
}
export default ContentPage

const ReplicantHunt = () => {
  const [id, setId] = useState<boolean | number>(false)

  const auth = useAuthentication()

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data, error } = usePotentialSpamUsersFetch()

  async function onClickHandler(e: MouseEvent<HTMLButtonElement>) {
    if (!(e.target instanceof HTMLButtonElement)) return
    e.target.blur()

    if (id === false || id === true) return //gotta love ts
    const input = {
      botIds: [id],
    }

    // document.getElementById('profile-preview')?.removeAttribute('src')
    // document.getElementById('profile-preview')?.classList.remove('loaded')

    const success = await mutationFetch(auth, mutation, input)
    if (success) {
      document.body.classList.add('white')
      setTimeout(() => {
        setId(false)
        document.body.classList.remove('white')
        reset()
        showToastNotice('terminated 💥', 'warning')
      }, 1000)
    } else {
      document.getElementById('logo')?.classList.add('head-shake')
      setTimeout(() => {
        document.getElementById('logo')?.classList.remove('head-shake')
        reset()
      }, 1000)
    }
  }

  function reset() {
    setId(false)
    // document.getElementById('profile-preview')?.removeAttribute('src')
    // document.getElementById('profile-preview')?.classList.remove('loaded')
  }

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    const id = parseInt(e.target.value)
    if (isNaN(id) || id < 1) {
      setId(false)
      reset()
    } else {
      setId(id)
    }
  }

  // useEffect(() => {
  //   if (!id || id === true) return
  //   const src = `${location.origin}/user/${id}/replicant?#content`
  //   document.getElementById('profile-preview')?.setAttribute('src', src)
  // })

  const canDo = useCanDo()
  const canDelete = canDo(User.deleteBot)

  return (
    <>
      <div className="flex">
        {canDelete ? (
          <Guard data={data} error={error} needsAuth>
            <>
              <div className="sidebar">{renderSidebar()}</div>
              {renderTool()}
              <div className="userdata">{renderUserData()}</div>
            </>
          </Guard>
        ) : (
          <p className="pt-36 text-center w-full">
            sorry, <br />
            authorized personnel only.
          </p>
        )}
      </div>
      <Style />
    </>
  )

  function renderTool() {
    return (
      <div className="tool">
        <div id="logo" />
        <div className="input-wrapper">
          #{' '}
          <input
            placeholder="000000"
            value={id ? id.toString() : ''}
            onChange={onChangeHandler}
          />
        </div>
        <button onClick={onClickHandler} disabled={id ? undefined : true}>
          terminate
        </button>
      </div>
    )
  }

  function renderUserData() {
    if (!id || !data) return null
    const user = data.nodes.find((node) => node.id === id)
    if (!user) return
    const { description, motivation } = user
    return (
      <>
        <h2>{user?.username}</h2>
        <p>
          {description}
          <br />
          --{motivation}
        </p>
      </>
    )
  }

  function renderSidebar() {
    if (!data) return null

    return data.nodes.map(({ username, id }) => {
      return (
        <a
          className="cursor-pointer"
          key={username}
          onClick={() => {
            setId(id)
          }}
        >
          {id}
        </a>
      )
    })
  }
}

const Style = () => (
  <style global jsx>{`
    :root {
      --off-white: #ccc;
    }

    body {
      color: var(--off-white);
      background: #111;
      transition: 0.5s background;
    }

    body.white {
      background: #ddd;
    }

    div.userdata {
      width: 50vw;
      height: 100vh;
      background-color: #151515;
      color: #fff;
    }

    .tool {
      width: 44vw;
    }
    .sidebar {
      width: 6vw;
      background-color: #151515;
      color: #555;
      height: 100vh;
      overflow-y: scroll;
      font-size: 0.8rem;
    }

    .sidebar a {
      border-bottom: 1px solid #333;
      display: block;
      padding: 0.3rem 0;
      text-align: center;
    }

    #logo {
      background: url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0' y='0' viewBox='0 0 254.8 230.9' xml:space='preserve'%3E%3Cstyle%3E.st0%7Bfill:%23ccc%7D%3C/style%3E%3Cpath class='st0' d='m103 92-10-8a21 21 0 0 1-20 17 21 21 0 0 1-22-21 21 21 0 0 1 10-18L41 48c-5 7-8 16-8 24 0 7 1 13 3 18 2 6 6 11 10 15 6 6 15 10 26 10h52l-4-7-17-16z'/%3E%3Cpath class='st0' d='m65 65-4 3c-3 3-5 7-5 12 0 4 2 8 5 11s7 5 12 5a16 16 0 0 0 16-15l-5-3c-1 2-4 4-7 4a9 9 0 0 1-7-13l-5-4zm133 15a16 16 0 0 0-8-15l-5 4 1 4c0 5-4 9-8 9-3 0-6-2-7-4l-5 3c1 4 2 7 5 10s7 5 11 5c5 0 9-2 12-5s4-7 4-11zm-4-27c-24 5-46 18-67 30-20-12-42-25-66-30 25 15 53 32 66 59 14-27 42-44 67-59z'/%3E%3Cpath class='st0' d='M127 31C82 29 41 21 0 0c1 120 52 178 127 231 76-53 127-111 128-231-41 21-82 29-128 31zm34 147v-21c8-3 18-10 21-19h-40v44h9l-23 22-24-22h10v-44H73c3 9 13 16 21 19v21c-19-17-38-36-51-58 27 5 57 4 85 4 27 0 57 1 84-4-13 22-32 41-51 58zm66-106c0 7-2 14-4 20s-6 12-11 16c-7 7-17 11-29 11H72c-13 0-22-4-29-11-5-5-9-10-11-16a51 51 0 0 1 5-47c-9-7-16-13-19-18 34 21 69 32 109 33 41-1 76-12 110-33-3 5-10 11-19 18 6 8 9 18 9 27z'/%3E%3Cpath class='st0' d='m194 62 3 3c4 4 6 9 6 15a21 21 0 0 1-21 21 21 21 0 0 1-20-17 178 178 0 0 0-27 24c-2 2-4 4-4 7h52a37 37 0 0 0 36-25 47 47 0 0 0-5-42l-20 14z'/%3E%3C/svg%3E")
        no-repeat;

      width: 40vh;
      height: 40vh;
      max-width: 30vw;
      margin: 6vh auto;
    }

    #__next {
      font-family: monospace;
      text-align: center;
      font-size: 2rem;
    }

    .input-wrapper {
    }

    input {
      background-color: transparent;
      color: var(--off-white);

      font-size: 1.6rem;
      border: 0;
      outline: 0;
      margin-left: -0.5rem;
      width: 6.5rem;
    }

    button {
      margin-top: 10vh;
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.2;
    }

    @keyframes head-shake {
      0 {
        transform: translateX(0);
      }

      12.5% {
        transform: translateX(-18px) rotateY(-9deg) skewY(1deg);
      }

      37.5% {
        transform: translateX(15px) rotateY(4.5deg) skewY(-1deg);
      }

      62.5% {
        transform: translateX(-9px) rotateY(-2.25deg) skewY(0);
      }

      87.5% {
        transform: translateX(6px) rotateY(3deg);
      }

      100% {
        transform: translateX(0);
      }
    }

    .head-shake {
      animation-duration: 0.5s;
      animation-timing-function: cubic-bezier(0, 0.23, 1, 0.71);
      animation-name: head-shake;
      transform-orgin: center bottom;
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
      // @ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return data.user.potentialSpamUsers
    },
  })
}

const potentialSpamUsersQuery = gql`
  query potentialSpamUsers($first: Int!) {
    user {
      potentialSpamUsers(first: $first) {
        nodes {
          id
          ...userData
        }
      }
    }
  }

  ${sharedUserFragment}
`
