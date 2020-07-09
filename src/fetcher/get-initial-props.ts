import { NextPageContext } from 'next'
import absoluteUrl from 'next-absolute-url'

// eslint-disable-next-line import/extensions
import { PageViewProps } from '@/pages/[[...slug]]'

export const getInitialProps = async (props: NextPageContext) => {
  const slug =
    props.query.slug === undefined ? [] : (props.query.slug as string[])
  const joinedSlug = slug.join('/')
  const { origin } = absoluteUrl(props.req)

  if (
    joinedSlug === '' ||
    joinedSlug === 'search' ||
    joinedSlug === 'spenden'
  ) {
    //TODO: Probaby add another type for FetchedData pages
    // also check what values we might actually need to feed slug-head
    return ({
      fetchedData: {},
      page: joinedSlug === '' ? 'landing' : joinedSlug,
      origin: origin,
    } as unknown) as PageViewProps
  }
  //TODO: maybe also add api pages?

  if (typeof window === 'undefined') {
    const res = await fetch(
      `${origin}/api/frontend/${encodeURIComponent(joinedSlug)}?redirect`
    )

    const fetchedData = (await res.json()) as PageViewProps['fetchedData']
    // compat course to first page
    if (fetchedData.redirect) {
      props.res?.writeHead(301, {
        Location: fetchedData.redirect,
        // Add the content-type for SEO considerations
        'Content-Type': 'text/html; charset=utf-8',
      })
      props.res?.end()
      // We redirect here so the component won't be actually rendered
      return ({} as unknown) as PageViewProps
    }

    if (fetchedData.error) {
      props.res!.statusCode = 404
    }

    return { fetchedData, origin }
  } else {
    //client

    const url = '/' + joinedSlug

    getGa()('set', 'page', url)
    getGa()('send', 'pageview')
    try {
      const fromCache = sessionStorage.getItem(url)
      if (fromCache) {
        return JSON.parse(fromCache) as PageViewProps
      }
    } catch (e) {
      //
    }
    const origin = window.location.host
    const protocol = window.location.protocol
    const res = await fetch(`${protocol}//${origin}/api/frontend${url}`)
    const fetchedData = (await res.json()) as PageViewProps['fetchedData']
    // compat: redirect of courses
    if (fetchedData.redirect) {
      const res = await fetch(
        `${protocol}//${origin}/api/frontend${fetchedData.redirect}`
      )
      const fetchedData2 = (await res.json()) as PageViewProps['fetchedData']
      return { fetchedData: fetchedData2, origin }
    }
    return { fetchedData, origin }
  }
}

/* eslint-disable */
// Safe access to Google Analytics globals
function getGa(): (...args: any[]) => void {
  const w = (window as unknown) as any
  const ga = w[w['GoogleAnalyticsObject'] || 'ga']
  return ga || (() => {})
}
/* eslint-enable */
