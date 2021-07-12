import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { tint } from 'polished'
import styled from 'styled-components'

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
    return <Notice success>{strings.revisions.noCurrentNotice}</Notice>
  }
  if (!isRejected && !isCurrentRevision) return null
  return (
    <Notice success={isCurrentRevision}>
      <FontAwesomeIcon icon={isRejected ? faTimes : faCheck} />{' '}
      {isRejected
        ? strings.revisions.rejectedNotice
        : strings.revisions.currentNotice}
    </Notice>
  )
}

const Notice = styled.div<{ success?: boolean }>`
  margin: 50px 0;
  padding: 16px;
  border-radius: 20px;
  font-weight: bold;
  background-color: ${(props) =>
    tint(0.7, props.success ? props.theme.colors.brandGreen : '#c56c6c')};
`
