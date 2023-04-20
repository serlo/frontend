import { ExternalRevisionLoader } from './external-revision-loader'
import { RevisionHistoryLoader } from './revision-history-loader'
import { UuidType } from '@/data-types'

export function ContentLoaders({
  id,
  currentRevision,
  entityType,
  onSwitchRevision,
}: {
  id: number
  currentRevision: number
  entityType: UuidType
  onSwitchRevision: (data: any) => void
}) {
  if (id) {
    return (
      <RevisionHistoryLoader
        id={id}
        currentRevision={currentRevision}
        onSwitchRevision={onSwitchRevision}
      />
    )
  }
  return (
    <ExternalRevisionLoader
      entityType={entityType}
      onSwitchRevision={onSwitchRevision}
    />
  )
}
