import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const revalidate = 60 * 60 * 12

export async function GET(_request: Request) {
  const allKeys = await kv.keys('quickbar-de-*')
  const quickbarData = await kv.mget(...allKeys)

  return NextResponse.json({ quickbarData })
}
