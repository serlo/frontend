import { fetchPageData } from '../fetch-page-data'
import { deSubjectLandingSubjects } from '@/components/pages/subject-landing'
import { deSubjectLandingData } from '@/data/de/de-subject-landing-data'
import { TaxonomyPage } from '@/data-types'

export async function subjectLandingGetStaticProps(
  locale: string,
  subject: deSubjectLandingSubjects
) {
  const pageData = await fetchPageData(
    `/${locale}/${deSubjectLandingData[subject].allTopicsTaxonomyId}`
  )
  return {
    props: {
      pageData: JSON.parse(JSON.stringify(pageData)) as TaxonomyPage, // remove undefined values
    },
    revalidate: 60 * 60, // 1h,
    notFound: pageData.kind !== 'taxonomy',
  }
}
