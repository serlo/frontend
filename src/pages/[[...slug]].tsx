import { NextPage } from 'next'
import React from 'react'

import { Topic, TopicProp } from '@/components/content/topic'
import type { MetaMenuProps } from '@/components/navigation/meta-menu'
import { PrettyLinksProvider } from '@/contexts/pretty-links-context'
import { InitialProps, PageData } from '@/data-types'
import { getInitialProps } from '@/fetcher/get-initial-props'

const PageView: NextPage<PageViewProps> = (props) => {
  // This is old code and should be removed little by little
  React.useEffect(() => {
    try {
      sessionStorage.setItem(props.fetchedData.alias, JSON.stringify(props))
    } catch (e) {
      //
    }
  }, [props])

  if (!props.fetchedData) return null
  const { fetchedData } = props
  const { contentId, prettyLinks } = fetchedData

  return (
    <PrettyLinksProvider value={prettyLinks}>
      {renderContent()}
    </PrettyLinksProvider>
  )

  function renderContent() {
    return (
      <main>
        {fetchedData.contentType === 'TaxonomyTerm' ? (
          <Topic data={fetchedData.data} contentId={contentId} />
        ) : null}
      </main>
    )
  }
}

PageView.getInitialProps = getInitialProps

export interface FetchedData {
  contentId: number
  alias: string
  title: string
  horizonIndices: number[]
  breadcrumbs: any
  navigation: MetaMenuProps['data']
  license: any
  prettyLinks: Record<string, { alias: string }>
  error: boolean
  type?: string
  redirect?: string
  pageData: PageData
}

interface TaxonomyTermFetchedData extends FetchedData {
  contentType: 'TaxonomyTerm'
  data: TopicProp
}

export interface PageViewProps {
  fetchedData: TaxonomyTermFetchedData
  origin: string
  page?: string
  newInitialProps?: InitialProps
}

export default PageView
