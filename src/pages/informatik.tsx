import { GetStaticProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { ErrorPage } from '@/components/pages/error-page'
import { LandingInformatik } from '@/components/pages/landing-informatik'
import { SlugPageData, SlugProps } from '@/data-types'
import { fetchPageData } from '@/fetcher/fetch-page-data'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<SlugProps>(({ pageData }) => {
  if (pageData.kind === 'taxonomy' && pageData.taxonomyData.subterms) {
    const subterms = pageData.taxonomyData.subterms.filter(
      (term) => term.type !== 'locale' && term.id !== 75211
    )
    return (
      <FrontendClientBase noContainers noHeaderFooter>
        <LandingInformatik subterms={subterms} />
      </FrontendClientBase>
    )
  }

  return (
    <FrontendClientBase>
      <ErrorPage
        code={pageData.kind === 'error' ? pageData.errorData.code : 400}
        message={
          pageData.kind === 'error'
            ? pageData.errorData.message
            : 'unsupported type'
        }
      />
    </FrontendClientBase>
  )
})

export const getStaticProps: GetStaticProps<SlugProps> = async (context) => {
  const pageData = await fetchPageData(`/${context.locale!}/47899`)

  const defaultRevalidate = 60 * 60 // 1h

  const revalidate =
    pageData.kind === 'error' && pageData.errorData.code >= 500
      ? 1
      : defaultRevalidate

  return {
    props: {
      pageData: JSON.parse(JSON.stringify(pageData)) as SlugPageData, // remove undefined values
    },
    revalidate,
  }
}
