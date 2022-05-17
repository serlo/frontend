import { Instance } from '@serlo/api'
import { GetStaticPaths, GetStaticProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { TaxonomyMoveCopy } from '@/components/taxonomy/taxonomy-move-copy'
import { SlugProps, TaxonomyPage } from '@/data-types'
import { requestPage } from '@/fetcher/request-page'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<{ pageData: TaxonomyPage }>(
  ({ pageData }) => {
    return (
      <FrontendClientBase
        noContainers
        loadLoggedInData /* warn: enables preview editor without login */
      >
        <div className="relative">
          <MaxWidthDiv>
            <TaxonomyMoveCopy taxonomyData={pageData.taxonomyData} />
          </MaxWidthDiv>{' '}
        </div>
      </FrontendClientBase>
    )
  }
)

export const getStaticProps: GetStaticProps<SlugProps> = async (context) => {
  if (!context.params || Array.isArray(context.params.id) || !context.params.id)
    return { notFound: true }

  const pageData = await requestPage(
    '/' + context.params.id,
    context.locale! as Instance
  )

  if (pageData.kind !== 'taxonomy') return { notFound: true }

  return {
    props: {
      pageData: JSON.parse(JSON.stringify(pageData)) as TaxonomyPage, // remove undefined values
    },
    revalidate: 60 * 2, // 2 min,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
