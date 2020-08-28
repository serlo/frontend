import { NextPageContext } from 'next'
import absoluteUrl from 'next-absolute-url'

import { InitialProps, PageData, InstanceData } from '@/data-types'
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
  console.log('query', query)
  const slug =
    props.query.slug === undefined ? [] : (props.query.slug as string[])
  const joinedSlug = slug.join('/')
  const url = '/' + joinedSlug
  const { origin } = absoluteUrl(props.req)

  if (typeof window !== 'undefined') {
    getGa()('set', 'page', url)
    getGa()('send', 'pageview')
  }

  const { instance: instance_path, alias } = parseLanguageSubfolder(url)
  const instance =
    fetcherAdditionalData.instance && typeof window !== 'undefined'
      ? fetcherAdditionalData.instance
      : instance_path

  //console.log(instance, url, fetcherAdditionalData.instance)

  let instanceData: InstanceData | undefined = undefined

  if (typeof window === 'undefined') {
    // only load instanceData serverside
    instanceData = getInstanceDataByLang(instance)
  }

  const rawAlias = alias.substring(1)

  if (rawAlias === 'search' || rawAlias === 'user/notifications') {
    return {
      pageData: {
        kind: rawAlias,
      },
      instanceData,
      origin,
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
          landingData: getLandingData(instance),
        },
      }
    }

    //server
    const res = await fetch(
      `${origin}/api/frontend/${encodeURIComponent(joinedSlug)}`
    )

    const fetchedData = (await res.json()) as PageData
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

    if (fetchedData.kind === 'error') {
      props.res!.statusCode = fetchedData.errorData.code
    } else {
      props.res!.setHeader(
        'Cache-Control',
        's-maxage=1, stale-while-revalidate'
      )
    }

    return {
      origin,
      instanceData,
      pageData: fetchedData,
    }
  } else {
    //client

    try {
      const fromCache = sessionStorage.getItem(`/${instance}${url}`)
      if (fromCache) {
        return {
          origin: fetcherAdditionalData.origin,
          pageData: JSON.parse(fromCache) as PageData,
        }
      }
    } catch (e) {
      //
    }

    const res = await fetch(
      `${fetcherAdditionalData.origin}/api/frontend/${
        fetcherAdditionalData.instance
      }${url.replace(/\/$/, '')}`
    )
    const fetchedData = (await res.json()) as PageData
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
      pageData: fetchedData,
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
