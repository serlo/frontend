import { Instance } from '@serlo/api'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'

import { Revision } from '@/components/author/revision'
import { EntityBase } from '@/components/entity-base'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { InitialPropsRevision, RevisionPage } from '@/data-types'
import { requestPage } from '@/fetcher/request-page'

export default function Page(initialProps: NextPage & InitialPropsRevision) {
  const pageData = initialProps.pageData

  return (
    <FrontendClientBase noContainers>
      <EntityBase page={pageData}>
        <Revision data={pageData.revisionData} />
      </EntityBase>
    </FrontendClientBase>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const revisionId = parseInt(context.params?.revision_id as string)

  const pageData = isNaN(revisionId)
    ? undefined
    : await requestPage(`/${revisionId}`, context.locale! as Instance)

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
