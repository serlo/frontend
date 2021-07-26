import { faEye, faPencilAlt, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

import { UserLink } from '../user/user-link'
import { Link } from '@/components/content/link'
import { TimeAgo } from '@/components/time-ago'
import { useInstanceData } from '@/contexts/instance-context'
import type { CompBaseProps, HistoryRevisionsData } from '@/data-types'
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
          <Th>{strings.revisionHistory.changes}</Th>
          <Th>{strings.revisionHistory.status}</Th>
          <Th>{strings.revisionHistory.author}</Th>
          <Th>{strings.revisionHistory.date}</Th>
          <Th>{strings.revisionHistory.view}</Th>
          <Th>{strings.revisionHistory.new}</Th>
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

const Th: CompBaseProps = ({ children }) => (
  <th className="serlo-th sticky top-0 bg-white border-0">{children}</th>
)

const Td: CompBaseProps<{
  centered?: boolean
}> = ({ children, centered }) => (
  <td
    className={clsx('serlo-td', centered && 'text-center')}
    style={{ borderLeftColor: 'transparent', borderRightColor: 'transparent' }}
  >
    {children}
  </td>
)
