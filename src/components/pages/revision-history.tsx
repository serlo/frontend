import { faEye, faPencilAlt, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

import { UserLink } from '../user/user-link'
import { Link } from '@/components/content/link'
import { TimeAgo } from '@/components/time-ago'
import { useInstanceData } from '@/contexts/instance-context'
import type { HistoryRevisionData, HistoryRevisionsData } from '@/data-types'
import { getRevisionEditUrl } from '@/helper/get-revision-edit-url'
import { theme } from '@/theme'

export interface RevisionHistoryProps {
  data?: HistoryRevisionsData
  hideEdit?: boolean
  onSelectRevision?: (id: number) => void
}

export function RevisionHistory({
  data,
  hideEdit,
  onSelectRevision,
}: RevisionHistoryProps) {
  const { strings } = useInstanceData()
  if (!data) return null
  const isPage = data.__typename === 'Page'
  const { changes, status, author, date, view, edit } = strings.revisionHistory

  function handleOnClick(id: number) {
    onSelectRevision && onSelectRevision(id)
  }

  return (
    <table className="mx-side border-collapse w-full relative">
      <thead>
        <tr>
          {renderTh(changes)}
          {renderTh(status)}
          {renderTh(author)}
          {renderTh(date)}
          {renderTh(view)}
          {!hideEdit && renderTh(edit)}
        </tr>
      </thead>
      <tbody>{data.revisions?.nodes.map(renderRow)}</tbody>
    </table>
  )

  function renderRow(entry: HistoryRevisionData) {
    const isCurrent = entry.id === data!.currentRevision?.id
    const viewUrl = `/entity/repository/compare/${data!.id}/${entry.id}`
    const editUrl = getRevisionEditUrl(isPage, data!.id, entry.id)
    const isEditorLink = onSelectRevision !== undefined
    const isActiveEditorLink = !isCurrent && isEditorLink

    return (
      <tr key={entry.id} className={isCurrent ? 'bg-brand-50' : undefined}>
        <td className="serlo-td" style={{ textAlign: 'left' }}>
          <Link
            title={strings.revisionHistory.viewLabel}
            href={isEditorLink ? undefined : viewUrl}
          >
            <span
              className={clsx(
                isCurrent ? 'font-bold' : undefined,
                isActiveEditorLink ? 'cursor-pointer' : ''
              )}
              onClick={
                isActiveEditorLink ? () => handleOnClick(entry.id) : undefined
              }
            >
              {entry.changes || '–'}
            </span>
          </Link>
        </td>
        <td className="serlo-td"> {getStatus(entry.trashed, isCurrent)}</td>
        <td className="serlo-td" style={{ textAlign: 'left' }}>
          <UserLink user={entry.author} />
        </td>
        <td className="serlo-td" style={{ textAlign: 'left' }}>
          <TimeAgo datetime={new Date(entry.date)} dateAsTitle />
        </td>
        <td
          className="serlo-td"
          onClick={
            isActiveEditorLink ? () => handleOnClick(entry.id) : undefined
          }
        >
          {(isActiveEditorLink || !isEditorLink) && (
            <Link
              className="serlo-button serlo-make-interactive-light my-0 mx-auto text-base"
              title={strings.revisionHistory.viewLabel}
              href={isEditorLink ? undefined : viewUrl}
            >
              <FontAwesomeIcon icon={faEye} size="1x" />
            </Link>
          )}
        </td>
        {!hideEdit && (
          <td className="serlo-td">
            <Link
              className="serlo-button serlo-make-interactive-light my-0 mx-auto text-base"
              title={strings.revisionHistory.editLabel}
              href={editUrl}
            >
              <FontAwesomeIcon icon={faPencilAlt} size="1x" />
            </Link>
          </td>
        )}
        <style jsx>
          {`
            border-left-color: transparent;
            border-right-color: transparent;
            text-align: center;
          `}
        </style>
      </tr>
    )
  }

  function renderTh(text: string) {
    return <th className="serlo-th sticky top-0 bg-white border-0">{text}</th>
  }

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
