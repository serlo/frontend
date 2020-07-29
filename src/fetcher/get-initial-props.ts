import { NextPageContext } from 'next'
import absoluteUrl from 'next-absolute-url'

import { InitialProps, PageData, FetchedData, InstanceData } from '@/data-types'
import {
  parseLanguageSubfolder,
  getInstanceDataByLang,
  getLandingData,
} from '@/helper/feature-i18n'

export const fetcherAdditionalData = {
  origin: '',
  instance: '',
}

export async function getInitialProps(
  props: NextPageContext
): Promise<InitialProps> {
  const slug =
    props.query.slug === undefined ? [] : (props.query.slug as string[])
  const joinedSlug = slug.join('/')
  const url = '/' + joinedSlug
  const { origin } = absoluteUrl(props.req)

  if (typeof window !== 'undefined') {
    getGa()('set', 'page', url)
    getGa()('send', 'pageview')
  }

  console.log('url:', url)

  console.log('additional data', fetcherAdditionalData)

  const { instance: instance_path, alias } = parseLanguageSubfolder(url)
  const instance = fetcherAdditionalData.instance
    ? fetcherAdditionalData.instance
    : instance_path

  console.log('get initial props', instance, alias)

  let instanceData: InstanceData | undefined = undefined

  if (typeof window === 'undefined') {
    // only load instanceData serverside
    console.log('hi')
    instanceData = getInstanceDataByLang(instance)
  }

  if (joinedSlug === 'search' || joinedSlug === 'user/notifications') {
    return {
      pageData: {
        kind: joinedSlug,
      },
      instanceData,
      origin,
    }
  }

  if (alias === '/' && instance == 'de') {
    console.log('de landing')
    return {
      origin,
      instanceData,
      pageData: {
        kind: 'landing',
      },
    }
  }

  if (alias === '/spenden' && instance == 'de') {
    return {
      origin,
      instanceData,
      pageData: {
        kind: 'donation',
      },
    }
  }

  if (typeof window === 'undefined') {
    if (alias === '/') {
      return {
        origin,
        instanceData,
        pageData: {
          kind: 'landing',
          data: getLandingData(instance),
        },
      }
    }

    //server
    const res = await fetch(
      `${origin}/api/frontend/${encodeURIComponent(joinedSlug)}`
    )

    const fetchedData = (await res.json()) as FetchedData
    // compat course to first page
    /*if (fetchedData.redirect) {
      props.res?.writeHead(301, {
        Location: fetchedData.redirect,
        // Add the content-type for SEO considerations
        'Content-Type': 'text/html; charset=utf-8',
      })
      props.res?.end()
      // We redirect here so the component won't be actually rendered
      return {
        origin: '',
        pageData: { kind: 'error', errorData: { code: 200 } },
      }
    }*/

    if (fetchedData.error) {
      const code = fetchedData.error.includes(
        "Cannot read property 'path' of null"
      )
        ? 404
        : 500
      props.res!.statusCode = code

      return {
        instanceData,
        pageData: { kind: 'error', errorData: { code } },
        origin,
      }
    }

    props.res!.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')

    return {
      origin,
      instanceData,
      pageData: fetchedData.pageData!,
    }
  } else {
    //client

    try {
      const fromCache = sessionStorage.getItem(url)
      if (fromCache) {
        return {
          origin: fetcherAdditionalData.origin,
          pageData: JSON.parse(fromCache) as PageData,
        }
      }
    } catch (e) {
      //
    }

    if (url === '/') {
      console.log('landing page')
    }

    const res = await fetch(
      `${fetcherAdditionalData.origin}/api/frontend/${fetcherAdditionalData.instance}${url}`
    )
    const fetchedData = (await res.json()) as FetchedData
    // compat: redirect of courses
    /*if (fetchedData.redirect) {
      const res = await fetch(
        `${fetcherAdditionalData.origin}/api/frontend${fetchedData.redirect}`
      )
      const fetchedData2 = (await res.json()) as FetchedData
      return {
        origin: fetcherAdditionalData.origin,
        pageData: fetchedData2.pageData!,
      }
    }*/
    return {
      origin: fetcherAdditionalData.origin,
      pageData: fetchedData.pageData!,
    }
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
