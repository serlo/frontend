import { geolocation } from '@vercel/edge'
import { NextResponse, type NextRequest } from 'next/server'

import type { Region } from '@/components/landing/exams/exams-finder/exams-finder'

const regionMapping = {
  //   BW: 'Baden-Württemberg',
  BY: 'Bayern',
  //   BE: 'Berlin',
  //   BB: 'Brandenburg',
  //   HB: 'Bremen',
  //   HH: 'Hamburg',
  //   HE: 'Hessen',
  //   MV: 'Mecklenburg-Vorpommern',
  NI: 'Niedersachsen',
  //   NW: 'Nordrhein-Westfalen',
  //   RP: 'Rheinland-Pfalz',
  //   SL: 'Saarland',
  //   SN: 'Sachsen',
  //   ST: 'Sachsen-Anhalt',
  //   SH: 'Schleswig-Holstein',
  //   TH: 'Thüringen',
} as const

export function middleware(request: NextRequest) {
  const { countryRegion } = geolocation(request)

  const regionName = countryRegion
    ? //@ts-expect-error good enough
      (regionMapping[countryRegion] as Region | undefined)
    : 'bayern'

  return NextResponse.redirect(
    new URL('/mathe-pruefungen/' + regionName, request.url)
  )
}

export const config = {
  matcher: '/mathe-pruefungen',
}
