import { faEye } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '../fa-icon'
import { UnrevisedSubject } from '../revisions/unrevised-subject'
import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'
import type { UnrevisedRevisionsData } from '@/data-types'
import { getSubjectSlug } from '@/helper/get-subject-slug'
import { replacePlaceholders } from '@/helper/replace-placeholders'

export interface UnrevisedRevisionsOverviewProps {
  data: UnrevisedRevisionsData
}

export function UnrevisedRevisionsOverview({
  data,
}: UnrevisedRevisionsOverviewProps) {
  const { strings } = useInstanceData()

  return (
    <>
      <div className="flex justify-between">
        {renderHelp()}
        {renderQuicklinks()}
      </div>
      {data.subjects.map((subject) => (
        <UnrevisedSubject key={subject.id} subject={subject} />
      ))}
    </>
  )

  function renderHelp() {
    const {
      help1,
      help2,
      help3,
      help4,
      reviewers,
      reviewersUrl,
      contactPerson,
      contactPersonUrl,
      guideline,
      guidelineUrl,
    } = strings.unrevisedRevisions

    return (
      <div>
        <p className="serlo-p">
          {replacePlaceholders(help1, {
            reviewersLink: <Link href={reviewersUrl}>{reviewers}</Link>,
          })}
        </p>
        <p className="serlo-p">
          {replacePlaceholders(help2, { eyeIcon: <FaIcon icon={faEye} /> })}
        </p>
        <p className="serlo-p font-bold">
          {replacePlaceholders(help3, {
            contactLink: <Link href={contactPersonUrl}>{contactPerson}</Link>,
          })}
          <br />
          {replacePlaceholders(help4, {
            guidelineLink: <Link href={guidelineUrl}>{guideline}</Link>,
          })}
        </p>
      </div>
    )
  }

  function renderQuicklinks() {
    return (
      <div className="serlo-p w-full">
        <b className="mb-0 ml-side pt-0">
          {strings.unrevisedRevisions.subjectLinks}
        </b>
        <ul className="serlo-ul">
          {data.subjects.map((subject) => {
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
