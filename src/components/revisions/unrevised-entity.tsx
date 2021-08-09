import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AbstractEntity } from '@serlo/api'
import clsx from 'clsx'
import { useState } from 'react'

import { QueryResponseRevisionNoPage } from '../pages/unrevised-revisions'
import { UserLink } from '../user/user-link'
import { Link } from '@/components/content/link'
import { TimeAgo } from '@/components/time-ago'
import { useInstanceData } from '@/contexts/instance-context'
import type { CompBaseProps } from '@/data-types'
import { QueryResponseNoRevision } from '@/fetcher/query-types'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getTitleFromEntity } from '@/helper/getTitleFromEntity'

export interface UnrevisedEntityProps {
  key: number
  entity: UnrevisedEntityData
}

export interface UnrevisedEntityData extends AbstractEntity {
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

export function UnrevisedEntity({ key, entity }: UnrevisedEntityProps) {
  const [showAll, setShowAll] = useState(false)
  const { strings } = useInstanceData()

  const nodes = entity.revisions?.nodes ?? entity.solutionRevisions?.nodes ?? []

  // @ts-expect-error I'm okay with just trying if it's there
  const revisionTitle = entity.revisions?.nodes[0].title as string | undefined
  const title =
    getTitleFromEntity(entity as QueryResponseNoRevision) ??
    revisionTitle ??
    entity.id

  return (
    <div key={key} className="mx-side mb-10">
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
      {renderTable()}
      {renderShowAll()}
    </div>
  )

  function renderTable() {
    return (
      <table className="mt-1 border-collapse w-full relative">
        <tbody>
          {renderRevision(nodes[0])}
          {showAll &&
            nodes.slice(1).map((revision) => {
              return renderRevision(revision)
            })}
        </tbody>
      </table>
    )
  }

  function renderRevision(revision: QueryResponseRevisionNoPage) {
    const viewUrl = `/entity/repository/compare/${entity.id}/${revision.id}`

    return (
      <tr
        className={isProbablyWIP(revision.changes) ? 'opacity-50' : undefined}
      >
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

  function renderShowAll() {
    if (nodes.length === 1 || showAll) return null
    return (
      <button className="serlo-link mt-2" onClick={() => void setShowAll(true)}>
        {strings.unrevisedRevisions.showMoreRevisions.replace(
          '%number%',
          nodes.length.toString()
        )}
      </button>
    )
  }

  function isProbablyWIP(changes: string) {
    const wipStrings = [
      'wip',
      'in arbeit',
      'work in progress',
      'noch nicht freigeben',
      'zwischenspeicherung',
      'noch nicht fertig',
      'im aufbau',
    ]
    return wipStrings.some((testStr) => changes.toLowerCase().includes(testStr))
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
