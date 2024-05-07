import { GetStaticPaths, GetStaticProps } from 'next'

import { Revision } from '@/components/author/revision/revision'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { RevisionViewProvider } from '@/contexts/revision-view-context'
import { RevisionProps, RevisionPage } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { requestRevision } from '@/fetcher/revision/request'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<RevisionProps>(({ pageData }) => (
  <RevisionViewProvider value>
    <FrontendClientBase
      entityId={pageData.revisionData.thisRevision.id}
      authorization={pageData.authorization}
      noContainers
    >
      <Revision data={pageData.revisionData} />
    </FrontendClientBase>
  </RevisionViewProvider>
))

export const getStaticProps: GetStaticProps<RevisionProps> = async (
  context
) => {
  const revisionId = parseInt(context.params?.revision_id as string)

  if (isNaN(revisionId)) {
    return { notFound: true }
  }

  const pageData = await requestRevision(
    revisionId,
    context.locale! as Instance
  )

  if (pageData.kind === 'not-found') {
    return { notFound: true }
  }

  return {
    props: {
      pageData: JSON.parse(JSON.stringify(pageData)) as RevisionPage, // remove undefined values
    },
    revalidate: 60, // 1 min
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
