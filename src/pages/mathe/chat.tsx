import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

import { EntityBase } from '@/components/entity-base'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { SlugProps, SlugPageData } from '@/data-types'
import { fetchPageData } from '@/fetcher/fetch-page-data'
import { renderedPageNoHooks } from '@/helper/rendered-page'

/*
    Temporary chat implementation, only for testing
*/

export default renderedPageNoHooks<SlugProps>(({ pageData }) => {
  if (pageData.kind !== 'single-entity') return <></>
  return (
    <FrontendClientBase noContainers entityId={pageData.entityData.id}>
      <EntityBase page={pageData}>
        <iframe
          src="http://community.serlo.org/home?layout=embedded"
          frameBorder="0"
        />
      </EntityBase>
    </FrontendClientBase>
  )
})

export const getStaticProps: GetStaticProps<SlugProps> = async () => {
  const pageData = await fetchPageData('/mathe')
  return {
    props: {
      pageData: JSON.parse(JSON.stringify(pageData)) as SlugPageData, // remove undefined values
    },
    revalidate: 1,
  }
}
