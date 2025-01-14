import type { EditorRowsDocument } from '@editor/package'
import { GetStaticPaths, GetStaticProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { LicenseDetail } from '@/components/pages/license-detail'
import { licensesContent } from '@/data/licenses/licenses-content'
import { LicenseDetailProps } from '@/data-types'
import { parseDocumentString } from '@/helper/parse-document-string'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<LicenseDetailProps>(({ pageData }) => (
  <FrontendClientBase noIndex>
    <LicenseDetail {...pageData.licenseData} />
  </FrontendClientBase>
))

export const getStaticProps: GetStaticProps<LicenseDetailProps> = async (
  context
) => {
  const id = parseInt(context.params?.id as string)

  if (isNaN(id)) return { notFound: true }

  const licenseContent = licensesContent.find(
    (license) => id === license.id
  )?.content

  if (!licenseContent) return { notFound: true }

  // hack to remove undefined pluginId value, can be removed when we move to app directory
  const content = parseDocumentString(licenseContent) as EditorRowsDocument

  return {
    props: {
      pageData: {
        kind: 'license-detail',
        licenseData: {
          id,
          content,
        },
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
