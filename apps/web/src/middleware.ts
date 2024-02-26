import { NextResponse, type NextRequest } from 'next/server'

import type { SupportedRegion } from '@/components/landing/exams/exams-finder/exams-finder'

const regionMapping = {
  BY: 'bayern',
  NI: 'niedersachsen',
} as const

export function middleware(request: NextRequest) {
  const region = request.geo?.region ?? 'BY'

  const regionSlug = regionMapping[
    region as keyof typeof regionMapping
  ] as SupportedRegion

  return NextResponse.redirect(
    new URL('/pruefungen/' + regionSlug, request.url)
  )
}

export const config = {
  matcher: '/pruefungen',
}
