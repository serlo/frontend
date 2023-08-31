import { SubjectLandingContent } from './subject-landing-content'
import { FrontendClientBase } from '../frontend-client-base'
import { deSubjectLandingData } from '@/data/de/de-subject-landing-data'
import type { InstanceData, TaxonomyPage } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'

export type deSubjectLandingSubjects = keyof typeof deSubjectLandingData

type SubjectLandingProps = { pageData: TaxonomyPage } & {
  subject: deSubjectLandingSubjects
  locale?: Instance
  instanceData?: InstanceData
}

// Informatik "Baustelle" and locales
const hide = [75211, 16030, 44323, 16063, 146728, 23384]

export function SubjectLanding({
  pageData,
  subject,
  locale,
  instanceData,
}: SubjectLandingProps) {
  if (pageData.taxonomyData.subterms) {
    const subterms = pageData.taxonomyData.subterms.filter(
      (term) => !hide.includes(term.id)
    )
    return (
      <FrontendClientBase
        noContainers
        noHeaderFooter
        locale={locale}
        instanceData={instanceData}
      >
        <SubjectLandingContent subject={subject} subterms={subterms} />
      </FrontendClientBase>
    )
  }
  return null
}
