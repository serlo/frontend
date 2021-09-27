import { Subject } from '@serlo/api'

import { UnrevisedSubject } from '../revisions/unrevised-subject'
import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'
import type { UnrevisedRevisionsData } from '@/data-types'

export interface UnrevisedRevisionsOverviewProps {
  data: UnrevisedRevisionsData
}

export function UnrevisedRevisionsOverview({
  data,
}: UnrevisedRevisionsOverviewProps) {
  const { lang, strings } = useInstanceData()

  return (
    <>
      <div className="flex justify-between">
        {renderHelp()}
        {renderQuicklinks()}
      </div>
      {data.subjects.map((subject: Subject) => (
        <UnrevisedSubject key={subject.id} subject={subject} />
      ))}
    </>
  )

  function renderHelp() {
    const { supportLinks, guideline } = strings.unrevisedRevisions

    const guidelineUrl =
      lang === 'de'
        ? '/140473'
        : 'https://docs.google.com/document/d/1p03xx2KJrFw8Mui4-xllvSTHcEPi8G1bdC8rGXcH6f8/edit'

    return (
      <div>
        <h2 className="serlo-h2">{supportLinks}</h2>
        <p className="serlo-p">
          <Link href={guidelineUrl}>{guideline}</Link>
        </p>
      </div>
    )
  }

  function renderQuicklinks() {
    return (
      <div>
        <h2 className="serlo-h2">Quicklinks</h2>
        <ul className="serlo-ul">
          {data.subjects.map((subject: Subject) => {
            if (subject.unrevisedEntities.totalCount === 0) return null
            const name = subject.taxonomyTerm.name
            return (
              <li key={subject.id}>
                <a href={'#' + getSubjectSlug(name)} className="serlo-link">
                  {name} ({subject.unrevisedEntities.totalCount})
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export function getSubjectSlug(name: string) {
  return encodeURI(name.toLowerCase())
}
