import { useContext } from 'react'

import { StatsContext } from './frontend-client-base'

export function EventCounter({ prefix, path }: any) {
  const stats = useContext(StatsContext)

  if (!stats || !Array.isArray(path) || !path[0]) return null

  const key = `${prefix}_${path.map((x: any) => x.toString()).join('_')}`

  const count = stats.stats.events[key] ?? 0

  if (count < 1) return null

  return <> ({count})</>
}
