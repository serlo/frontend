import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

import { collectData } from './_collect-data'

// export const revalidate = 60 * 60 * 12

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const queryIds = searchParams.get('ids')
  const ids = getIds(queryIds)

  if (!ids)
    return NextResponse.json(
      { error: 'invalid input, need valid ids in query (…?ids=1,2,3)' },
      { status: 400 }
    )

  const newEntries = await collectData(ids)

  const kvData = newEntries.reduce((acc, value) => {
    const key = `quickbar-de-${value.id}`
    return { ...acc, [key]: value }
  }, {})

  await kv.mset(kvData)

  return NextResponse.json({ ids })
}

function getIds(queryIds: string | null) {
  if (!queryIds) return false

  const ids = queryIds.split(',').map((id) => parseInt(id))

  return ids.some((id) => isNaN(id) || !Number.isInteger(id) || id < 1)
    ? false
    : ids
}
