import { GetStaticPaths, GetStaticProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { Profile } from '@/components/pages/user/profile'
import { UserProps, UserPage } from '@/data-types'
import { requestUser } from '@/fetcher/user/request'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<UserProps>(({ pageData }) => (
  <FrontendClientBase
    entityId={pageData.userData.id}
    authorization={pageData.authorization}
  >
    <Profile userData={pageData.userData} />
  </FrontendClientBase>
))

export const getStaticProps: GetStaticProps<UserProps> = async (context) => {
  // /user/{id}}/{name}

  try {
    let pageData: UserPage | undefined = undefined

    const params = context.params

    if (params) {
      const slug = Array.isArray(params.userslug)
        ? params.userslug
        : [params.userslug]
      const path = `/user/${slug.join('/')}`
      pageData = await requestUser(path, context.locale ?? 'de')
      return {
        props: {
          pageData: JSON.parse(JSON.stringify(pageData)) as UserPage, // remove undefined values
        },
        revalidate: 1,
      }
    }
  } catch (e) {
    // uff
  }
  return { props: {}, notFound: true }

  //const pageData = isNaN(userId) ? undefined : await
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
