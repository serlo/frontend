import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AbstractEntity, PageRevision, Subject } from '@serlo/api'
import clsx from 'clsx'
import React from 'react'

import { UserLink } from '../user/user-link'
import { Link } from '@/components/content/link'
import { TimeAgo } from '@/components/time-ago'
import { useInstanceData } from '@/contexts/instance-context'
import type { CompBaseProps, UnrevisedRevisionsData } from '@/data-types'
import {
  QueryResponseNoRevision,
  QueryResponseRevision,
} from '@/fetcher/query-types'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getTitleFromEntity } from '@/helper/getTitleFromEntity'

export interface UnrevisedRevisionsOverviewProps {
  data: UnrevisedRevisionsData
}

type QueryResponseRevisionNoPage = Exclude<QueryResponseRevision, PageRevision>

interface UnrevisedEntity extends AbstractEntity {
  __typename:
    | 'Applet'
    | 'Article'
    | 'Course'
    | 'CoursePage'
    | 'Event'
    | 'Exercise'
    | 'ExerciseGroup'
    | 'GroupedExercise'
    | 'Video'
    | 'Solution'
  revisions?: {
    nodes: QueryResponseRevisionNoPage[]
  }
  solutionRevisions?: {
    nodes: QueryResponseRevisionNoPage[]
  }
}

export function UnrevisedRevisionsOverview({
  data,
}: UnrevisedRevisionsOverviewProps) {
  const { lang, strings } = useInstanceData()

  return (
    <>
      {renderHelpSection()}
      {data.subjects.map(renderSubject)}
    </>
  )

  function renderHelpSection() {
    const { supportLinks, guideline, discussionList, questionnaire } =
      strings.unrevisedRevisions

    const guidelineUrl =
      lang === 'de'
        ? '/140473'
        : 'https://docs.google.com/document/d/1p03xx2KJrFw8Mui4-xllvSTHcEPi8G1bdC8rGXcH6f8/edit'

    const questionnaireUrl =
      'https://docs.google.com/forms/d/e/1FAIpQLSfMjWIZZq2_AoHbqNv3AOEjQRBwA8qEZIMJpk5l0vX7w2nwnQ/viewform'

    return (
      <>
        <h2 className="serlo-h2">{supportLinks}</h2>
        <ul className="serlo-ul">
          <li>
            <Link href={guidelineUrl}>{guideline}</Link>
          </li>
          <li>
            <Link href="/discussions">{discussionList}</Link>
          </li>
          <li>
            <Link href={questionnaireUrl}>{questionnaire}</Link>
          </li>
        </ul>
      </>
    )
  }

  function renderSubject(subject: Subject) {
    if (subject.unrevisedEntities.totalCount === 0) {
      return null
    }
    return (
      <section className="mb-16">
        <h2 className="serlo-h2 border-0">
          {subject.taxonomyTerm.name} ({subject.unrevisedEntities.totalCount})
        </h2>

        {subject.unrevisedEntities.nodes.map((entity) =>
          renderEntity(entity as unknown as UnrevisedEntity)
        )}
      </section>
    )
  }

  function renderEntity(entity: UnrevisedEntity) {
    // @ts-expect-error I'm okay with just trying if it's there
    const revisionTitle = entity.revisions?.nodes[0].title as string | undefined
    const title =
      getTitleFromEntity(entity as QueryResponseNoRevision) ??
      revisionTitle ??
      entity.id

    return (
      <div key={entity.id} className="mx-side mb-12">
        <Link
          title={strings.revisionHistory.viewLabel}
          href={entity.alias ?? undefined}
          className="font-bold"
        >
          <b>{title}</b>
        </Link>{' '}
        <span className="text-sm text-gray-500">
          {getTranslatedType(strings, entity.__typename)}
        </span>
        {renderTable(entity)}
      </div>
    )
  }

  function renderTable(entity: UnrevisedEntity) {
    return (
      <table className="mt-1 border-collapse w-full relative">
        <tbody>
          {entity.revisions?.nodes.map((revision) => {
            return renderRevision(revision, entity.id)
          })}
        </tbody>
        <tbody>
          {entity.solutionRevisions?.nodes.map((revision) => {
            return renderRevision(revision, entity.id)
          })}
        </tbody>
      </table>
    )
  }

  function renderRevision(
    revision: QueryResponseRevisionNoPage,
    entityId: number
  ) {
    const viewUrl = `/entity/repository/compare/${entityId}/${revision.id}`

    return (
      <tr>
        <Td className="pl-0 w-1/2">
          <Link href={viewUrl} className="hover:no-underline text-black">
            {revision.changes || '–'}
          </Link>
        </Td>
        <Td>
          <UserLink user={revision.author} />
        </Td>
        <Td className="w-1/6">
          <TimeAgo datetime={new Date(revision.date)} dateAsTitle />
        </Td>
        <Td centered className="w-1/6">
          <Link
            className="serlo-button serlo-make-interactive-light my-0 mx-auto text-base"
            title={strings.revisionHistory.viewLabel}
            href={viewUrl}
          >
            <FontAwesomeIcon icon={faEye} size="1x" />
          </Link>
        </Td>
      </tr>
    )
  }
}

const Td: CompBaseProps<{
  centered?: boolean
  className?: string
}> = ({ children, centered, className }) => (
  <td
    className={clsx(className, 'serlo-td', centered && 'text-center')}
    style={{ borderLeftColor: 'transparent', borderRightColor: 'transparent' }}
  >
    {children}
  </td>
)
