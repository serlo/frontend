import request, { gql } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect, useState } from 'react'

import { endpoint } from '@/api/endpoint'
import { useAuthentication } from '@/auth/use-authentication'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { Events } from '@/components/user/events'
import { UserUnrevisedRevisions } from '@/components/user/user-unrevised-revisions'
import { useInstanceData } from '@/contexts/instance-context'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export interface UserEventHistoryProps {
  id: number
  username: string
}

export default renderedPageNoHooks<UserEventHistoryProps>((props) => {
  return (
    <FrontendClientBase>
      <Content {...props} />
    </FrontendClientBase>
  )
})

function Content({ username, id }: UserEventHistoryProps) {
  const { strings } = useInstanceData()
  const auth = useAuthentication()
  const [isOwn, setIsOwn] = useState(false)

  useEffect(() => {
    setIsOwn(auth?.username === username)
  }, [auth?.username, username])

  const title = strings.pageTitles[
    isOwn ? 'userEditsMine' : 'userEdits'
  ].replace('%user%', username)

  const backUrl = `/user/profile/${username}`

  return (
    <>
      <Breadcrumbs data={[{ label: username, url: backUrl }]} asBackButton />
      <PageTitle title={title} headTitle />
      <UserUnrevisedRevisions username={username} isOwn={isOwn} />

      <h2 className="serlo-h3" id="activities">
        {strings.eventLog.currentEvents}
      </h2>
      <Events userId={id} perPage={10} moreButton />
    </>
  )
}

// events query still relies on user uuid
export const getStaticProps: GetStaticProps<UserEventHistoryProps> = async (
  context
) => {
  const usernameParam = String(context.params?.username)
  if (!usernameParam) return { notFound: true }

  const data = await requestUserId(usernameParam)
  return data
    ? {
        props: { ...data },
        revalidate: 1,
      }
    : { notFound: true }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function requestUserId(
  username: string
): Promise<{ username: string; id: number } | undefined> {
  const { user } = await request<{
    user: { userByUsername: { id: number } }
  }>(endpoint, userIdByUsernameQuery, {
    username,
  })
  const id = user?.userByUsername.id
  return id ? { username, id } : undefined
}

export const userIdByUsernameQuery = gql`
  query userIdByUsername($username: String!) {
    user {
      userByUsername(username: $username) {
        id
      }
    }
  }
`
