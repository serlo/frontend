import { faTimes, faEye, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { StyledTd } from '../tags/styled-td'
import { UserLink } from '../user/user-link'
import { Link } from '@/components/content/link'
import { TimeAgo } from '@/components/time-ago'
import { useInstanceData } from '@/contexts/instance-context'
import type { HistoryRevisionsData } from '@/data-types'

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
          <th style={{ minWidth: '90px' }}>{strings.revisionHistory.author}</th>
          <th className="serlo-th">{strings.revisionHistory.date}</th>
          <th className="serlo-th">&nbsp;</th>
          <th className="serlo-th">&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {data.revisions?.nodes.map((entry) => {
          const isCurrent = entry.id === data.currentRevision.id
          return (
            <tr key={entry.id}>
              <StyledTd>
                {isCurrent && (
                  <span title={strings.revisions.currentNotice}>✅ </span>
                )}
                {/* TODO: Remove isCurrent check once this is solved: https://github.com/serlo/serlo.org-database-layer/issues/102 */}
                {entry.trashed && !isCurrent && (
                  <span title={strings.revisions.rejectedNotice}>
                    <FontAwesomeIcon icon={faTimes} />{' '}
                  </span>
                )}
                <b>{entry.changes}</b>
              </StyledTd>
              <StyledTd>
                <UserLink user={entry.author} />
              </StyledTd>
              <StyledTd>
                <TimeAgo datetime={new Date(entry.date)} dateAsTitle />
              </StyledTd>
              <StyledTd>
                <Link
                  className="serlo-button serlo-make-interactive-light my-0 mx-auto text-base"
                  href={`/entity/repository/compare/${data.id}/${entry.id}`}
                >
                  <FontAwesomeIcon icon={faEye} size="1x" />
                </Link>
              </StyledTd>
              <StyledTd>
                <Link
                  className="serlo-button serlo-make-interactive-light my-0 mx-auto text-base"
                  title={strings.revisionHistory.createNew}
                  href={`/entity/repository/add-revision/${data.id}/${entry.id}`}
                >
                  <FontAwesomeIcon icon={faPencilAlt} size="1x" />
                </Link>
              </StyledTd>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
