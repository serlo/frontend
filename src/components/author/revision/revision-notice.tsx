import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { tint } from 'polished'

import { useInstanceData } from '@/contexts/instance-context'
import { theme } from '@/theme'

export interface RevisionNoticeProps {
  isCurrentRevision: boolean
  isRejected: boolean
  hasCurrentRevision: boolean
}

export function RevisionNotice({
  isCurrentRevision,
  isRejected,
  hasCurrentRevision,
}: RevisionNoticeProps) {
  const { strings } = useInstanceData()

  if (!hasCurrentRevision) {
    return renderNotice(<>{strings.revisions.noCurrentNotice}</>, true)
  }
  if (!isRejected && !isCurrentRevision) return null
  return renderNotice(
    <>
      <FontAwesomeIcon icon={isRejected ? faTimes : faCheck} />{' '}
      {isRejected
        ? strings.revisions.rejectedNotice
        : strings.revisions.currentNotice}
    </>,
    isCurrentRevision
  )
}

function renderNotice(content: JSX.Element, success: boolean) {
  const backgroundColor = tint(
    0.7,
    success ? theme.colors.brandGreen : '#c56c6c'
  )

  return (
    <div
      style={{ backgroundColor }}
      className="my-12 p-4 rounded-3xl font-bold"
    >
      {content}
    </div>
  )
}
