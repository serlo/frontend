import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'

import { HeaderFooter } from '@/components/header-footer'
import { LandingInternational } from '@/components/pages/landing-international'
import { LandingPage } from '@/data-types'
import { getLandingData } from '@/helper/feature-i18n'

const Page: NextPage<{ pageData: LandingPage }> = ({ pageData }) => {
  return (
    <HeaderFooter page={pageData}>
      <LandingInternational data={pageData.landingData} />
    </HeaderFooter>
  )
}

export default Page

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async (context) => {
  const lang = context.params?.lang as string
  return {
    props: {
      pageData: {
        kind: 'landing',
        landingData: getLandingData(lang),
      },
      lang,
    },
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { lang: 'en' } },
      { params: { lang: 'ta' } },
      { params: { lang: 'hi' } },
      { params: { lang: 'fr' } },
      { params: { lang: 'es' } },
    ],
    fallback: 'blocking',
  }
}
