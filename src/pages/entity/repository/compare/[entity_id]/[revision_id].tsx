import { Instance } from '@serlo/api'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'

import { Revision } from '@/components/author/revision'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { RevisionProps, RevisionPage } from '@/data-types'
import { requestRevision } from '@/fetcher/revision/request'

export default function Page(initialProps: NextPage & RevisionProps) {
  const pageData = initialProps.pageData

  return (
    <FrontendClientBase>
      <Revision data={pageData.revisionData} />
    </FrontendClientBase>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
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

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
