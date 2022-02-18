import { fetchPageData } from '../fetch-page-data'
import { deSubjectLandingSubjects } from '@/components/pages/subject-landing'
import { SlugPageData } from '@/data-types'
import { deSubjectLandingData } from '@/data/de/de-subject-landing-data'

export async function subjectLandingGetStaticProps(
  locale: string,
  subject: deSubjectLandingSubjects
) {
  const pageData = await fetchPageData(
    `/${locale}/${deSubjectLandingData[subject].allTopicsTaxonomyId}`
  )
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
