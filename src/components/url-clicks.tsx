import { useContext } from 'react'

import { StatsContext } from './frontend-client-base'
import { EntityIdContext } from '@/contexts/entity-id-context'

export function UrlClicks({
  eventKey,
  fixColor,
}: {
  eventKey: string
  fixColor?: boolean
}) {
  const id = useContext(EntityIdContext)
  const stats = useContext(StatsContext)

  if (!id || !stats) return null

  const dates = Object.keys(stats.stats)

  let count = 0

  for (const date of dates) {
    const cur = stats.stats[date]
    if (cur.events[eventKey]) {
      //console.log(key)
      count += cur.events[eventKey]
    }
  }
  if (count < 1) return null

  //console.log('OK', eventKey, count)

  return (
    <>
      {' '}
      <small style={fixColor ? { color: 'black' } : {}}>({count})</small>
    </>
  )
}
