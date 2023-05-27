import {
  faXmark,
  faInfoCircle,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'

import { StaticInfoPanel } from '@/components/static-info-panel'
import { useInstanceData } from '@/contexts/instance-context'

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
    return (
      <StaticInfoPanel type="info" icon={faInfoCircle}>
        {strings.revisions.noCurrentNotice}
      </StaticInfoPanel>
    )
  }
  if (!isRejected && !isCurrentRevision) return null

  const type = isCurrentRevision ? 'success' : 'failure'
  return (
    <StaticInfoPanel type={type} icon={isRejected ? faXmark : faCheck}>
      {isRejected
        ? strings.revisions.rejectedNotice
        : strings.revisions.currentNotice}
    </StaticInfoPanel>
  )
}
