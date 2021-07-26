import { faEye, faPencilAlt, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    <table className="mx-side border-collapse w-full">
      <thead>
        <tr>
          <th className="serlo-th">{strings.revisionHistory.changes}</th>
          <th>{strings.revisionHistory.status}</th>
          <th style={{ minWidth: '90px' }}>{strings.revisionHistory.author}</th>
          <th>{strings.revisionHistory.date}</th>
          <th>{strings.revisionHistory.view}</th>
          <th>{strings.revisionHistory.new}</th>
        </tr>
      </thead>
      <tbody>
        {data.revisions?.nodes.map((entry) => {
          const isCurrent = entry.id === data.currentRevision?.id
          const viewUrl = `/entity/repository/compare/${data.id}/${entry.id}`

          return (
            <tr key={entry.id}>
              <td className="serlo-td">
                <Link title={strings.revisionHistory.viewLabel} href={viewUrl}>
                  <b>{entry.changes || '–'}</b>
                </Link>
              </td>
              <td className="serlo-td text-center">
                {getStatus(entry.trashed, isCurrent)}
              </td>
              <td className="serlo-td">
                <UserLink user={entry.author} />
              </td>
              <td className="serlo-td">
                <TimeAgo datetime={new Date(entry.date)} dateAsTitle />
              </td>
              <td className="serlo-td text-center">
                <Link
                  className="serlo-button serlo-make-interactive-light my-0 mx-auto text-base"
                  title={strings.revisionHistory.viewLabel}
                  href={viewUrl}
                >
                  <FontAwesomeIcon icon={faEye} size="1x" />
                </Link>
              </td>
              <td className="serlo-td text-center">
                <Link
                  className="serlo-button serlo-make-interactive-light my-0 mx-auto text-base"
                  title={strings.revisionHistory.newLabel}
                  href={`/entity/repository/add-revision/${data.id}/${entry.id}`}
                >
                  <FontAwesomeIcon icon={faPencilAlt} size="1x" />
                </Link>
              </td>
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
