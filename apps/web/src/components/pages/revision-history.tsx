import { faEye, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '../fa-icon'
import { UserLink } from '../user/user-link'
import { Link } from '@/components/content/link'
import { TimeAgo } from '@/components/time-ago'
import { useInstanceData } from '@/contexts/instance-context'
import { Revision, Revisions } from '@/fetcher/query-types'
import { cn } from '@/helper/cn'
import { getEditUrl } from '@/helper/urls/get-edit-url'

export function RevisionHistory({ data }: { data?: Revisions }) {
  const { strings } = useInstanceData()
  if (!data) return null
  const { changes, status, author, date, view, edit } = strings.revisionHistory

  return (
    <table className="relative mx-side w-full border-collapse">
      <thead>
        <tr>
          {renderTh(changes)}
          {renderTh(status)}
          {renderTh(author)}
          {renderTh(date)}
          {renderTh(view)}
          {renderTh(edit)}
        </tr>
      </thead>
      <tbody>{data.revisions?.nodes.map(renderRow)}</tbody>
    </table>
  )

  function renderRow(entry: Revision) {
    const isCurrent = entry.id === data!.currentRevision?.id
    const viewUrl = `/entity/repository/compare/${data!.id}/${entry.id}`
    const editUrl = getEditUrl(data!.id, entry.id)

    const changes = Object.hasOwn(entry, 'changes') ? entry.changes : '–'

    return (
      <tr key={entry.id}>
        <td className="serlo-td border-x-transparent">
          <Link title={strings.revisionHistory.viewLabel} href={viewUrl}>
            {changes}
          </Link>
        </td>
        <td className="serlo-td border-x-transparent text-center">
          {' '}
          {getStatus(entry.trashed, isCurrent)}
        </td>
        <td className="serlo-td border-x-transparent">
          <UserLink user={entry.author} />
        </td>
        <td className="serlo-td border-x-transparent">
          <TimeAgo datetime={new Date(entry.date)} dateAsTitle />
        </td>
        <td className="serlo-td border-x-transparent text-center">
          <Link
            className="serlo-button-light mx-auto my-0 text-base"
            title={strings.revisionHistory.viewLabel}
            href={viewUrl}
          >
            <FaIcon icon={faEye} />
          </Link>
        </td>
        <td className="serlo-td border-x-transparent text-center">
          <Link
            className="serlo-button-light mx-auto my-0 text-base"
            title={strings.revisionHistory.editLabel}
            href={editUrl}
          >
            <FaIcon icon={faPencilAlt} />
          </Link>
        </td>
      </tr>
    )
  }

  function renderTh(text: string) {
    return (
      <th className="serlo-th top-0 border-x-transparent border-t-transparent bg-white">
        {text}
      </th>
    )
  }

  function getStatus(trashed?: boolean, isCurrent?: boolean) {
    return (
      <span
        className={cn(
          'inline-block h-4 w-4 rounded-full',
          trashed ? '#c56c6c' : isCurrent ? 'bg-brandgreen' : '#eee'
        )}
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
