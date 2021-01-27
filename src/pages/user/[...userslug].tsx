import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'

import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Profile } from '@/components/pages/user/profile'
import { UserProps, UserPage } from '@/data-types'
import { requestUser } from '@/fetcher/user/request'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<UserProps>(({ pageData }) => (
  <FrontendClientBase>
    <PageTitle title={pageData.userData.username} headTitle />
    <Profile userData={pageData.userData} />
  </FrontendClientBase>
))

export const getStaticProps: GetStaticProps<UserProps> = async (context) => {
  // /user/{id}}/{name} or /user/{id}
  const userId = parseInt(context.params?.userslug[0] as string)

  const pageData = isNaN(userId) ? undefined : await requestUser(userId)

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
