import { GetStaticProps } from 'next'
import React from 'react'

import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { UnrevisedRevisionsOverview } from '@/components/pages/unrevised-revisions'
import { useInstanceData } from '@/contexts/instance-context'
import {
  UnrevisedRevisionsData,
  UnrevisedRevisionsPage,
  UnrevisedRevisionsProps,
} from '@/data-types'
import { Instance } from '@/fetcher/query-types'
import { requestUnrevisedRevisions } from '@/fetcher/unrevisedRevisions/request'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<UnrevisedRevisionsProps>(({ pageData }) => {
  return (
    <FrontendClientBase>
      <Content data={pageData.revisionsData} />
    </FrontendClientBase>
  )
})

function Content({ data }: { data: UnrevisedRevisionsData }) {
  return (
    <>
      <Title />
      <UnrevisedRevisionsOverview data={data} />
    </>
  )
}

export const getStaticProps: GetStaticProps<UnrevisedRevisionsProps> = async (
  context
) => {
  const pageData = await requestUnrevisedRevisions(context.locale as Instance)

  return {
    props: {
      pageData: JSON.parse(JSON.stringify(pageData)) as UnrevisedRevisionsPage, // remove undefined values
    },
    revalidate: 1,
  }
}

function Title() {
  const { strings } = useInstanceData()
  return <PageTitle title={strings.pageTitles.unrevisedRevisions} headTitle />
}
