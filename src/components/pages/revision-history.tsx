import { faEye, faPencilAlt, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { ReactChild } from 'react'

import { UserLink } from '../user/user-link'
import { Link } from '@/components/content/link'
import { TimeAgo } from '@/components/time-ago'
import { useInstanceData } from '@/contexts/instance-context'
import type { HistoryRevisionsData } from '@/data-types'
import { theme } from '@/theme'

export interface RevisionHistoryProps {
  data?: HistoryRevisionsData
}

export function RevisionHistory({ data }: RevisionHistoryProps) {
  const { strings } = useInstanceData()
  if (!data) return null

  return (
    <table className="mx-side border-collapse w-full relative">
      <thead>
        <tr>
          <Th text={strings.revisionHistory.changes} />
          <Th text={strings.revisionHistory.status} />
          <Th text={strings.revisionHistory.author} />
          <Th text={strings.revisionHistory.date} />
          <Th text={strings.revisionHistory.view} />
          <Th text={strings.revisionHistory.new} />
        </tr>
      </thead>
      <tbody>
        {data.revisions?.nodes.map((entry) => {
          const isCurrent = entry.id === data.currentRevision?.id
          const viewUrl = `/entity/repository/compare/${data.id}/${entry.id}`

          return (
            <tr
              key={entry.id}
              className={isCurrent ? 'bg-brand-50' : undefined}
            >
              <Td>
                <Link title={strings.revisionHistory.viewLabel} href={viewUrl}>
                  <span className={isCurrent ? 'font-bold' : undefined}>
                    {entry.changes || '–'}
                  </span>
                </Link>
              </Td>
              <Td centered>{getStatus(entry.trashed, isCurrent)}</Td>
              <Td>
                <UserLink user={entry.author} />
              </Td>
              <Td>
                <TimeAgo datetime={new Date(entry.date)} dateAsTitle />
              </Td>
              <Td centered>
                <Link
                  className="serlo-button serlo-make-interactive-light my-0 mx-auto text-base"
                  title={strings.revisionHistory.viewLabel}
                  href={viewUrl}
                >
                  <FontAwesomeIcon icon={faEye} size="1x" />
                </Link>
              </Td>
              <Td centered>
                <Link
                  className="serlo-button serlo-make-interactive-light my-0 mx-auto text-base"
                  title={strings.revisionHistory.newLabel}
                  href={`/entity/repository/add-revision/${data.id}/${entry.id}`}
                >
                  <FontAwesomeIcon icon={faPencilAlt} size="1x" />
                </Link>
              </Td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )

  function getStatus(trashed?: boolean, isCurrent?: boolean) {
    return (
      <FontAwesomeIcon
        icon={faCircle}
        color={
          trashed ? '#c56c6c' : isCurrent ? theme.colors.brandGreen : '#eee'
        }
        title={
          trashed
            ? strings.revisions.rejectedNotice
            : isCurrent
            ? strings.revisions.currentNotice
            : strings.revisions.unknownNotice
        }
      />
    )
  }
}

const Th = ({ text }: { text: string }) => (
  <th className="serlo-th sticky top-0 bg-white border-0">{text}</th>
)

const Td = ({
  children,
  centered,
}: {
  children: ReactChild
  centered?: boolean
}) => (
  <td
    className={clsx('serlo-td', centered && 'text-center')}
    style={{ borderLeftColor: 'transparent', borderRightColor: 'transparent' }}
  >
    {children}
  </td>
)
