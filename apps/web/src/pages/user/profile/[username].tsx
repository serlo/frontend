import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { Profile } from '@/components/pages/user/profile'
import { UserProps, UserPage } from '@/data-types'
import { requestUserByUsername } from '@/fetcher/user/request-user-by-username'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<UserProps>(({ pageData }) => {
  const { isActiveDonor, isActiveReviewer, isActiveAuthor, username } =
    pageData.userData
  return (
    <FrontendClientBase
      serloEntityData={{ entityId: pageData.userData.id }}
      authorization={pageData.authorization}
    >
      <Head>
        <title>{username}</title>
        {!isActiveDonor && !isActiveAuthor && !isActiveReviewer && (
          <meta name="robots" content="noindex" />
        )}
      </Head>
      <Profile userData={pageData.userData} />
    </FrontendClientBase>
  )
})

export const getStaticProps: GetStaticProps<UserProps> = async (context) => {
  const username = String(context.params?.username)
  if (!username) return { notFound: true }

  const pageData = await requestUserByUsername(username)
  if (pageData.kind === 'not-found') return { notFound: true }

  return {
    props: {
      pageData: JSON.parse(JSON.stringify(pageData)) as UserPage, // remove undefined values
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
