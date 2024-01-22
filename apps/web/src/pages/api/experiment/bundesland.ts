import { geolocation } from '@vercel/edge'

export const config = {
  runtime: 'edge',
}

// docs: https://vercel.com/guides/geo-ip-headers-geolocation-vercel-functions

const regionMapping = {
  BW: 'Baden-Württemberg',
  BY: 'Bayern',
  BE: 'Berlin',
  BB: 'Brandenburg',
  HB: 'Bremen',
  HH: 'Hamburg',
  HE: 'Hessen',
  MV: 'Mecklenburg-Vorpommern',
  NI: 'Niedersachsen',
  NW: 'Nordrhein-Westfalen',
  RP: 'Rheinland-Pfalz',
  SL: 'Saarland',
  SN: 'Sachsen',
  ST: 'Sachsen-Anhalt',
  SH: 'Schleswig-Holstein',
  TH: 'Thüringen',
} as const

export default function handler(request: Request) {
  const { countryRegion } = geolocation(request)

  const regionName = countryRegion
    ? //@ts-expect-error good enough
      (regionMapping[countryRegion] as string | undefined)
    : undefined

  return new Response(
    `<h1>${
      regionName
        ? `Du bist wahrscheinlich grade in ${regionName}, oder?`
        : 'Ich weiß nicht in welchem Bundesland du bist 🤷'
    }</h1>`,
    {
      headers: { 'content-type': 'text/html' },
    }
  )
}
