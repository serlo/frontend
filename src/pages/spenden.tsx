import { GetStaticProps } from 'next'
import React from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { Donations } from '@/components/pages/donations'

export default function Page() {
  return (
    <FrontendClientBase noHeaderFooter noContainers>
      <Donations />
    </FrontendClientBase>
  )
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      pageData: {
        kind: 'donation',
      },
    },
  }
}
