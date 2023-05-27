export async function getMonthlyViews(instance = 'de', aliases: string[]) {
  const paths = aliases.map((alias) => encodeURIComponent(alias)).join(',')

  //TODO: Probably cache
  const resp = await fetch(
    `https://simpleanalytics.com/${instance}.serlo.org.json?version=5&info=false&limit=1000&fields=pages&pages=${paths}`,
    {
      headers: {
        Cookie: process.env.SIMPLE_ANALYTICS_COOKIE_TOKEN!,
      },
    }
  )

  const data = (await resp.json()) as unknown as {
    pages: { pageviews: number; value: string }[]
    // etc…
  }
  if (!data || !data.pages) {
    // eslint-disable-next-line no-console
    console.log(data)
    // eslint-disable-next-line no-console
    console.error('could not fetch stats')
    return undefined
  }
  return data.pages
}

// example result from
// https://simpleanalytics.com/de.serlo.org.json?version=5&info=false&fields=pages&pages=/mathe/1552/zylinder
/*
  {
    ok: true,
    docs: 'https://docs.simpleanalytics.com/api',
    info: 'false',
    hostname: 'de.serlo.org',
    url: 'https://de.serlo.org',
    path: '/mathe/1555/zylinder',
    start: '2023-04-25T22:00:00.000Z',
    end: '2023-05-26T22:59:59.999Z',
    version: 5,
    timezone: 'Europe/Berlin',
    pages: [
      {
        value: '/mathe/1555/zylinder',
        pageviews: 695,
        visitors: 397,
      },
    ],
    generated_in_ms: 860,
  }
  */
