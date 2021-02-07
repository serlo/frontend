import { useContext } from 'react'

import { StatsContext } from './frontend-client-base'

export function EventCounter({ prefix, path }: any) {
  const stats = useContext(StatsContext)

  if (!stats || !Array.isArray(path) || !path[0]) return null

  const key = `${prefix}_${path.map((x: any) => x.toString()).join('_')}`

  console.log(key)

  let count = 0

  const dates = Object.keys(stats.stats)

  for (const date of dates) {
    const cur = stats.stats[date]
    if (cur.events && cur.events[key]) count += cur.events[key]
  }

  if (count < 1) return null

  return <> ({count})</>
}
