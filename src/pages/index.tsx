import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeaderFooter } from '@/components/header-footer'
import { LandingDE } from '@/components/pages/landing-de'
import { LandingInternational } from '@/components/pages/landing-international'
import { LandingPage } from '@/data-types'
import { getLandingData } from '@/helper/feature-i18n'

const Page: NextPage<{ pageData: LandingPage }> = ({ pageData }) => {
  const { locale } = useRouter()
  return (
    <FrontendClientBase>
      <HeaderFooter>
        {locale == 'de' ? (
          <LandingDE data={pageData.landingData} />
        ) : (
          <LandingInternational data={pageData.landingData} />
        )}
      </HeaderFooter>
    </FrontendClientBase>
  )
}

export default Page

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      pageData: {
        kind: 'landing',
        landingData: getLandingData(context.locale!),
      },
    },
  }
}
