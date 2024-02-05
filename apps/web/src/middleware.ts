import { geolocation } from '@vercel/edge'
import { NextResponse, type NextRequest } from 'next/server'

import type { SupportedRegion } from '@/components/landing/exams/exams-finder/exams-finder'

const regionMapping = {
  BY: 'bayern',
  NI: 'niedersachsen',
} as const

export function middleware(request: NextRequest) {
  const { countryRegion } = geolocation(request)

  const regionName = countryRegion
    ? //@ts-expect-error good enough
      (regionMapping[countryRegion] as SupportedRegion | undefined)
    : 'bayern'

  return NextResponse.redirect(
    new URL('/mathe-pruefungen/' + regionName, request.url)
  )
}

export const config = {
  matcher: '/mathe-pruefungen',
}
