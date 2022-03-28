import { FrontendClientBase } from '../frontend-client-base'
import { SubjectLandingContent } from './subject-landing-content'
import { TaxonomyPage } from '@/data-types'
import { deSubjectLandingData } from '@/data/de/de-subject-landing-data'

export type deSubjectLandingSubjects = keyof typeof deSubjectLandingData

type SubjectLandingProps = { pageData: TaxonomyPage } & {
  subject: deSubjectLandingSubjects
}

export function SubjectLanding({ pageData, subject }: SubjectLandingProps) {
  if (pageData.taxonomyData.subterms) {
    const subterms = pageData.taxonomyData.subterms.filter(
      (term) => term.type !== 'locale' && term.id !== 75211 // Informatik "Baustelle"
    )
    return (
      <FrontendClientBase noContainers noHeaderFooter>
        <SubjectLandingContent subject={subject} subterms={subterms} />
      </FrontendClientBase>
    )
  }
  return null
}
