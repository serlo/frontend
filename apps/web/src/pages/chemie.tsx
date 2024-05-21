import { GetStaticProps } from 'next'

import { SubjectLanding } from '@/components/pages/subject-landing'
import { SlugProps, TaxonomyPage } from '@/data-types'
// import { subjectLandingGetStaticProps } from '@/fetcher/subject-landing/subject-landing-get-static-props'
import { renderedPageNoHooks } from '@/helper/rendered-page'

const subject = 'chemie'

export default renderedPageNoHooks<{ pageData: TaxonomyPage }>(
  ({ pageData }) => {
    return <SubjectLanding subject={subject} pageData={pageData} />
  }
)

export const getStaticProps: GetStaticProps<
  SlugProps
> = async (/*context*/) => {
  return { notFound: true }
  // if (context.locale !== 'de') return { notFound: true }
  // return subjectLandingGetStaticProps(context.locale, subject)
}
