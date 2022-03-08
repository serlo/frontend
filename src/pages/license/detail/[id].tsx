import { GetStaticPaths, GetStaticProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { LicenseDetail } from '@/components/pages/license-detail'
import { LicenseDetailProps } from '@/data-types'
import { requestLicensePage } from '@/fetcher/license/request'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<LicenseDetailProps>(({ pageData }) => (
  <FrontendClientBase>
    <LicenseDetail {...pageData.licenseData} />
  </FrontendClientBase>
))

export const getStaticProps: GetStaticProps<LicenseDetailProps> = async (
  context
) => {
  const id = parseInt(context.params?.id as string)

  if (isNaN(id)) return { notFound: true }

  const licenseData = await requestLicensePage(id)

  return {
    props: {
      pageData: licenseData,
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
