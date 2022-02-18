import { FrontendClientBase } from '../frontend-client-base'
import { ErrorPage } from './error-page'
import { SubjectLandingContent } from './subject-landing-content'
import { SlugProps } from '@/data-types'
import { deSubjectLandingData } from '@/data/de/de-subject-landing-data'

export type deSubjectLandingSubjects = keyof typeof deSubjectLandingData

export function SubjectLanding({
  pageData,
  subject,
}: SlugProps & { subject: deSubjectLandingSubjects }) {
  if (pageData.kind === 'taxonomy' && pageData.taxonomyData.subterms) {
    const subterms = pageData.taxonomyData.subterms.filter(
      (term) => term.type !== 'locale' && term.id !== 75211
    )
    return (
      <FrontendClientBase noContainers noHeaderFooter>
        <SubjectLandingContent subject={subject} subterms={subterms} />
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
}
