import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'

import { EntityBase } from '@/components/entity-base'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeaderFooter } from '@/components/header-footer'
import { ErrorPage } from '@/components/pages/error-page'
import { LicenseDetail } from '@/components/pages/license-detail'
import { InitialProps, LicenseDetailPage } from '@/data-types'
import { fetchPageData } from '@/fetcher/fetch-page-data'

const PageView: NextPage<InitialProps> = (initialProps) => {
  const page = initialProps.pageData as LicenseDetailPage

  if (page === undefined) return <ErrorPage code={404} />

  return (
    <FrontendClientBase>
      <HeaderFooter>
        <EntityBase page={page}>
          <LicenseDetail {...page.licenseData} />
        </EntityBase>
      </HeaderFooter>
    </FrontendClientBase>
  )
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async (context) => {
  const id = parseInt(context.params?.license_id as string)
  const instance = context.locale ?? context.defaultLocale ?? 'de'

  const pageData = isNaN(id)
    ? undefined
    : ((await fetchPageData(
        `/${instance}/license/detail/${id}`
      )) as LicenseDetailPage)

  return {
    props: {
      pageData: { ...pageData, horizonData: pageData?.horizonData ?? null },
    },
    revalidate: 60 * 60 * 24, //one day in seconds
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export default PageView
