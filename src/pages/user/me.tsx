import { GetStaticProps, NextPage } from 'next'
import React from 'react'

import { HeaderFooter } from '@/components/header-footer'
import { ProfileRedirectMe } from '@/components/pages/user/profile-redirect-me'
import { SearchPage } from '@/data-types'

const Page: NextPage<{ pageData: SearchPage }> = ({ pageData }) => {
  return (
    <HeaderFooter page={pageData}>
      <ProfileRedirectMe />
    </HeaderFooter>
  )
}

export default Page

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      pageData: {
        kind: 'user/me',
      },
    },
  }
}
