import { faEye, faPencilAlt, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

import { UserLink } from '../user/user-link'
import { Link } from '@/components/content/link'
import { TimeAgo } from '@/components/time-ago'
import { useInstanceData } from '@/contexts/instance-context'
import type {
  CompBaseProps,
  HistoryRevisionData,
  HistoryRevisionsData,
} from '@/data-types'
import { getRevisionEditUrl } from '@/helper/get-revision-edit-url'
import { theme } from '@/theme'

export interface RevisionHistoryProps {
  data?: HistoryRevisionsData
}

export function RevisionHistory({ data }: RevisionHistoryProps) {
  const { strings } = useInstanceData()
  if (!data) return null
  const isPage = data.__typename === 'Page'
  const { changes, status, author, date, view, edit } = strings.revisionHistory

  return (
    <table className="mx-side border-collapse w-full relative">
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

  function renderRow(entry: HistoryRevisionData) {
    const isCurrent = entry.id === data!.currentRevision?.id
    const viewUrl = `/entity/repository/compare/${data!.id}/${entry.id}`
    const editUrl = getRevisionEditUrl(isPage, data!.id, entry.id)

    return (
      <tr key={entry.id} className={isCurrent ? 'bg-brand-50' : undefined}>
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
            title={strings.revisionHistory.editLabel}
            href={editUrl}
          >
            <FontAwesomeIcon icon={faPencilAlt} size="1x" />
          </Link>
        </Td>
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
