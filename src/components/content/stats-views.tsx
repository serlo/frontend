import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react'
import React from 'react'

import { IdContext, StatsContext } from '../frontend-client-base'

export function StatsViews() {
  const stats = React.useContext(StatsContext)
  const id = React.useContext(IdContext)
  if (id > -10 && stats && stats.useStats && stats.statsData) {
    const count = stats.statsData.counts[id]
    const countInternal = stats.statsData.countsInternal[id] ?? 0
    const countExternal = stats.statsData.countsExternal[id] ?? 0
    let nonExit = 0
    for (const refId in stats.statsData.clicks[id]) {
      nonExit += stats.statsData.clicks[id][refId]
    }
    console.log(nonExit, stats.statsData.clicks[id])
    nonExit = Math.max(0, Math.min(count, nonExit))
    nonExit = Math.round((100 * (count - nonExit)) / count)
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
        ({count} Aufrufe,{text}extern, ~{nonExit}% exit rate{' '}
        <Tippy content={<RefererList />}>
          <span>
            <FontAwesomeIcon icon={faQuestionCircle} />
          </span>
        </Tippy>
        )
      </small>
    )
  }
  return null
}

function RefererList() {
  const stats = React.useContext(StatsContext)
  const id = React.useContext(IdContext)
  const refs = []
  for (const pageid in stats.statsData.clicks) {
    if (stats.statsData.clicks[pageid][id]) {
      refs.push({ id: pageid, count: stats.statsData.clicks[pageid][id] })
    }
  }
  refs.sort((a, b) => b.count - a.count)
  return (
    <div style={{ backgroundColor: 'whitesmoke', padding: 4 }}>
      {refs.length} interne Referrer, davon Top 5:
      <br />
      {refs.slice(0, 5).map((ref, id) => {
        const path = Object.keys(stats.statsData.uuid2paths[ref.id])[0]
        return (
          <>
            <small key={ref.id}>
              {id + 1}) {path} ({ref.count})
            </small>
            <br />
          </>
        )
      })}
    </div>
  )
}
