import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { ErrorPage } from '@/components/pages/error-page'
import { LicenseDetail } from '@/components/pages/license-detail'
import { LicenseDetailPage } from '@/data-types'
import { requestLicensePage } from '@/fetcher/license/request'

const PageView: NextPage<{ pageData: LicenseDetailPage }> = (initialProps) => {
  const page = initialProps.pageData

  return (
    <FrontendClientBase>
      {page === undefined ? (
        <ErrorPage code={404} />
      ) : (
        <LicenseDetail {...page.licenseData} />
      )}
    </FrontendClientBase>
  )
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async (context) => {
  const id = parseInt(context.params?.id as string)

  const licenseData = isNaN(id) ? undefined : await requestLicensePage(id)

  return {
    props: {
      pageData: licenseData,
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
