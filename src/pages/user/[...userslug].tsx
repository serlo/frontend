import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { ErrorPage } from '@/components/pages/error-page'
import { Profile } from '@/components/pages/user/profile'
import { UserProps, UserPage } from '@/data-types'
import { requestUser } from '@/fetcher/user/request'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<UserProps>(({ pageData }) => {
  if (pageData === undefined) return <ErrorPage code={404} />
  if (pageData.kind === 'user/profile') {
    const { isActiveDonor, isActiveReviewer, isActiveAuthor, username } =
      pageData.userData
    return (
      <FrontendClientBase
        entityId={pageData.userData.id}
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
  }
  return (
    <FrontendClientBase>
      <ErrorPage code={404} />
    </FrontendClientBase>
  )
})

export const getStaticProps: GetStaticProps<UserProps> = async (context) => {
  // /user/{id}/{name}
  const path = '/user/' + (context.params?.userslug as string[]).join('/')
  const pageData = await requestUser(path, context.locale ?? 'de')
  // todo: pageData could be notFound
  return {
    props: {
      pageData: JSON.parse(JSON.stringify(pageData)) as UserPage, // remove undefined values
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
