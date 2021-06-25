import { Instance } from '@serlo/api'
import { GetStaticPaths, GetStaticProps } from 'next'

import { Revision } from '@/components/author/revision/revision'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { RevisionProps, RevisionPage } from '@/data-types'
import { requestRevision } from '@/fetcher/revision/request'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<RevisionProps>(({ pageData }) => (
  <FrontendClientBase
    entityId={pageData.revisionData.thisRevision.id}
    authorization={pageData.authorization}
  >
    <Revision data={pageData.revisionData} />
  </FrontendClientBase>
))

export const getStaticProps: GetStaticProps<RevisionProps> = async (
  context
) => {
  const revisionId = parseInt(context.params?.revision_id as string)

  const pageData = isNaN(revisionId)
    ? undefined
    : await requestRevision(revisionId, context.locale! as Instance)

  return {
    props: {
      pageData: JSON.parse(JSON.stringify(pageData)) as RevisionPage, // remove undefined values
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
