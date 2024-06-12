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

  if (pageData.kind !== 'taxonomy') {
    return {
      notFound: true,
      props: { pageData: {} as TaxonomyPage },
      revalidate: 60 * 5, // 5 mins
    }
  }

  return {
    props: {
      pageData: JSON.parse(JSON.stringify(pageData)) as TaxonomyPage, // remove undefined values
    },
    revalidate: 60 * 60 * 24 * 2, // 2 days
  }
}
