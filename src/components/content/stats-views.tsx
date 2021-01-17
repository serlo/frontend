import React from 'react'

import { IdContext, StatsContext } from '../frontend-client-base'

export function StatsViews() {
  const stats = React.useContext(StatsContext)
  const id = React.useContext(IdContext)
  if (id > -10 && stats && stats.useStats && stats.statsData) {
    const count = stats.statsData.counts[id]
    const countInternal = stats.statsData.countsInternal[id] ?? 0
    const countExternal = stats.statsData.countsExternal[id] ?? 0
    if (!count) return <small>(0 Aufrufe)</small>
    const lowerBound = Math.round((countExternal * 100) / count)
    const upperBound = Math.round(100 - (countInternal * 100) / count)
    let text = ' '
    if (lowerBound == upperBound) {
      text += `${lowerBound}% `
    } else {
      text += `${lowerBound}-${upperBound}% `
    }
    return (
      <small>
        ({count} Aufrufe,{text}extern)
      </small>
    )
  }
  return null
}
