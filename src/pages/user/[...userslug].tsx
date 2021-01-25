import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'

import { EntityBase } from '@/components/entity-base'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Profile } from '@/components/pages/user/profile'
import { InitialPropsUser, UserPage } from '@/data-types'
import { requestUser } from '@/fetcher/user/request'

export default function Page(initialProps: NextPage & InitialPropsUser) {
  const pageData = initialProps.pageData

  return (
    <FrontendClientBase noContainers>
      <EntityBase page={pageData}>
        <Profile userData={pageData.userData} />
      </EntityBase>
    </FrontendClientBase>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
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

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
