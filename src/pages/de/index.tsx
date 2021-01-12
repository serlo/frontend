import { GetStaticProps, NextPage } from 'next'
import React from 'react'

import { HeaderFooter } from '@/components/header-footer'
import { LandingDE } from '@/components/pages/landing-de'
import { LandingPage } from '@/data-types'
import { getLandingData } from '@/helper/feature-i18n'

const Page: NextPage<{ pageData: LandingPage }> = ({ pageData }) => {
  return (
    <HeaderFooter page={pageData}>
      <LandingDE data={pageData.landingData} />
    </HeaderFooter>
  )
}

export default Page

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      pageData: {
        kind: 'landing',
        landingData: getLandingData('de'),
      },
      lang: 'de',
    },
  }
}
