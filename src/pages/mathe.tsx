import { GetStaticProps } from 'next'

import { SubjectLanding } from '@/components/pages/subject-landing'
import { SlugProps } from '@/data-types'
import { subjectLandingGetStaticProps } from '@/fetcher/subject-landing/subject-landing-get-static-props'
import { renderedPageNoHooks } from '@/helper/rendered-page'

const subject = 'mathe'

export default renderedPageNoHooks<SlugProps>(({ pageData }) => {
  return <SubjectLanding subject={subject} pageData={pageData} />
})

export const getStaticProps: GetStaticProps<SlugProps> = async (context) => {
  return subjectLandingGetStaticProps(context.locale!, subject)
}
