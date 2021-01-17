import React from 'react'

import { IdContext, StatsContext } from '../frontend-client-base'

export function UrlClicks({
  href,
  fixColor,
}: {
  href: string
  fixColor?: boolean
}) {
  const id = React.useContext(IdContext)
  const stats = React.useContext(StatsContext)
  if (id < -10 || !stats || !stats.useStats || !stats.statsData) {
    return null
  }
  const clicks = stats.statsData.clicks[id]
  const paths: any = {}
  for (const clickid in clicks) {
    for (const path in stats.statsData.uuid2paths[clickid]) {
      paths[path] = clicks[clickid]
      paths[`/${clickid}`] = clicks[clickid]
    }
  }
  if (!paths[href]) return null
  return (
    <>
      {' '}
      <small style={fixColor ? { color: 'black' } : {}}>({paths[href]})</small>
    </>
  )
}
