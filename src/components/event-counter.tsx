import { useContext } from 'react'

import { StatsContext } from './frontend-client-base'

export function EventCounter({ prefix, path, onlyNumber }: any) {
  const stats = useContext(StatsContext)

  if (!stats || !Array.isArray(path) || !path[0]) return null

  const key = `${prefix}_${path.map((x: any) => x.toString()).join('_')}`

  const count = stats.stats.events[key] ?? 0

  if (onlyNumber) {
    return <>{count}</>
  }

  if (count < 1) return null

  return <> ({count})</>
}
