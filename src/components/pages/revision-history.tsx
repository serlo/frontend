import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt'
import clsx from 'clsx'

import { FaIcon } from '../fa-icon'
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
  selectedRevisionId?: number
}

export function RevisionHistory({
  data,
  hideEdit,
  onSelectRevision,
  selectedRevisionId,
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

    const isImportant =
      selectedRevisionId === entry.id ||
      (isCurrent && selectedRevisionId === undefined)
    const isActiveEditorLink = isEditorLink && !isImportant

    return (
      <tr key={entry.id} className={isImportant ? 'bg-brand-50' : undefined}>
        <td className="serlo-td" style={{ textAlign: 'left' }}>
          <Link
            title={strings.revisionHistory.viewLabel}
            href={isEditorLink ? undefined : viewUrl}
          >
            <span
              className={clsx(
                isImportant ? 'font-bold' : undefined,
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
              <FaIcon icon={faEye} />
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
              <FaIcon icon={faPencilAlt} />
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
      <span
        className="rounded-full inline-block w-4 h-4"
        style={{
          backgroundColor: trashed
            ? '#c56c6c'
            : isCurrent
            ? theme.colors.brandGreen
            : '#eee',
        }}
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
