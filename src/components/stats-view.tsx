import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react'
import React from 'react'

import { StatsContext } from './frontend-client-base'
import { LazyTippy } from './navigation/lazy-tippy'
import { EntityIdContext } from '@/contexts/entity-id-context'

export function StatsViews() {
  const stats = React.useContext(StatsContext)
  const id = React.useContext(EntityIdContext)

  if (!stats || !id) {
    return null
  }

  const dates = Object.keys(stats.stats)

  let count = 0
  let countInternal = 0
  let countExternal = 0
  let actions = 0
  let referrer = {}

  for (const date of dates) {
    const cur = stats.stats[date]
    if (!cur.views[id]) continue
    count += cur.views[id].sum
    countInternal += cur.views[id].internal
    countExternal += cur.views[id].external

    const clicks = cur.clicks[id]
    if (clicks) {
      for (const clickId in clicks) {
        if (parseInt(clickId) !== -2) {
          console.log('click', clickId, clicks[clickId])
          actions += clicks[clickId] ?? 0
        }
      }
    }
    for (const event in cur.events) {
      if (
        event.includes(`clicksearch_${id}`) ||
        event.includes(`share_${id}`) ||
        event.includes(`_entity${id}_`) ||
        event.includes(`_tax${id}_`)
      ) {
        console.log(event, cur.events[event])
        actions += cur.events[event]
      }
    }
  }
  if (!count) return <small>(keine Aufrufe)</small>
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
      ({count} Aufrufe,{text}extern, {Math.round((actions * 100) / count)}{' '}
      <span title="Aktionen pro 100 Aufrufe">AphA</span>)
    </small>
  )
}

/*
, 


function RefererList() {
  const stats = React.useContext(StatsContext)
  const id = React.useContext(EntityIdContext)
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
*/
