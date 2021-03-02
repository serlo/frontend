import React from 'react'

import { StatsContext } from './frontend-client-base'
import { EntityIdContext } from '@/contexts/entity-id-context'

export function StatsViews() {
  const stats = React.useContext(StatsContext)
  const id = React.useContext(EntityIdContext)

  if (!stats || !id) {
    return null
  }

  const count = stats.stats.counts[id]?.views ?? 0
  const countInternal = stats.stats.counts[id]?.internal ?? 0
  const countSE = stats.stats.counts[id]?.searchengine ?? 0
  const countWebsites = stats.stats.counts[id]?.website ?? 0
  const apha = stats.stats.counts[id]?.apha ?? 0

  return (
    <small>
      ({count} Aufrufe: {Math.round((countInternal * 100) / count)}% intern,{' '}
      {Math.round((countSE * 100) / count)}% SuMa,{' '}
      {Math.round((countWebsites * 100) / count)}% Web / {apha}{' '}
      <span title="Aktionen pro 100 Aufrufe">AphA</span>)
    </small>
  )
}
