import { GetStaticProps } from 'next'
import React from 'react'

import { Donations } from '@/components/pages/donations'

export default function Page() {
  return <Donations />
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale !== 'de') return { notFound: true }
  return {
    props: {
      pageData: {
        kind: 'donation',
      },
    },
  }
}
