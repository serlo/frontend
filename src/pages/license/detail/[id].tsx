import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { ErrorPage } from '@/components/pages/error-page'
import { LicenseDetail } from '@/components/pages/license-detail'
import { LicenseDetailPage, LicenseDetailProps } from '@/data-types'
import { requestLicensePage } from '@/fetcher/license/request'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<LicenseDetailProps>(({ pageData }) => (
  <FrontendClientBase>
    {pageData === undefined ? (
      <ErrorPage code={404} />
    ) : (
      <LicenseDetail {...pageData.licenseData} />
    )}
  </FrontendClientBase>
))

export const getStaticProps: GetStaticProps<LicenseDetailProps> = async (
  context
) => {
  const id = parseInt(context.params?.id as string)

  const licenseData = isNaN(id) ? undefined : await requestLicensePage(id)
  // todo: return notFound if id is invalid

  return {
    props: {
      pageData: licenseData as LicenseDetailPage,
    },
    revalidate: 60 * 60 * 24, //one day in seconds
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
