import { GetStaticPaths, GetStaticProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { LicenseDetail } from '@/components/pages/license-detail'
import { licenseDataContent } from '@/data/licenses/license-data-content'
import { LicenseDetailProps } from '@/data-types'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { parseDocumentString } from '@/serlo-editor/static-renderer/helper/parse-document-string'
import type { EditorRowsDocument } from '@/serlo-editor-integration/types/editor-plugins'

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

  const licenseContent = licenseDataContent.find((license) => license.id)
    ?.content
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
    revalidate: 60 * 60 * 24, //one day in seconds
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
