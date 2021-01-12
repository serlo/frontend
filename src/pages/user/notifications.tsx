import { GetStaticProps, NextPage } from 'next'
import React from 'react'

import { HeaderFooter } from '@/components/header-footer'
import { Notifications } from '@/components/pages/user/notifications'
import { SearchPage } from '@/data-types'

const Page: NextPage<{ pageData: SearchPage }> = ({ pageData }) => {
  return (
    <HeaderFooter page={pageData}>
      <Notifications />
    </HeaderFooter>
  )
}

export default Page

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      pageData: {
        kind: 'user/notifications',
      },
    },
  }
}
