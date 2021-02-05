import { useContext } from 'react'

import { StatsContext } from './frontend-client-base'
import { EntityIdContext } from '@/contexts/entity-id-context'

export function UrlClicks({
  href,
  fixColor,
}: {
  href: string
  fixColor?: boolean
}) {
  const id = useContext(EntityIdContext)
  const stats = useContext(StatsContext)

  if (!id || !stats) return null

  const dates = Object.keys(stats.stats)

  let count = 0

  for (const date of dates) {
    const cur = stats.stats[date]
    const hrefId = stats.path2uuid[encodeURI(decodeURI(href))]
    if (hrefId && cur.clicks[id]) {
      count += cur.clicks[id][hrefId] ?? 0
    }
  }
  if (count < 1) return null
  return (
    <>
      {' '}
      <small style={fixColor ? { color: 'black' } : {}}>({count})</small>
    </>
  )
}
