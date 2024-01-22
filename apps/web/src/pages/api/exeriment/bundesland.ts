import { geolocation } from '@vercel/edge'

export const config = {
  runtime: 'edge',
}

export default function handler(request: Request) {
  const { countryRegion } = geolocation(request)

  return new Response(
    `<h1>${
      countryRegion
        ? `Du bist wahrscheinlich grade in ${countryRegion}, oder?`
        : 'Ich weiß nicht in welchem Bundesland du bist 🤷'
    }</h1>`,
    {
      headers: { 'content-type': 'text/html' },
    }
  )
}
