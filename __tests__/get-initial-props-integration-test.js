/* eslint-disable */

const fetch = require('node-fetch')

// some samples of integration tests for the frontend fetcher

describe('landing pages', () => {
  test('german landing page', async () => {
    const props = await getInitialProps('/de/')
    expect(props.origin).toBe('http://localhost:3000')
    expect(props.instanceData.lang).toBe('de')
    expect(props.instanceData.headerData).toBeDefined()
    expect(props.instanceData.footerData).toBeDefined()
    expect(props.instanceData.strings).toBeDefined()
    expect(props.pageData).toEqual({ kind: 'landing' })
  })

  test('englisch landing page', async () => {
    const props = await getInitialProps('/en/')
    expect(props.instanceData.lang).toBe('en')
    expect(props.pageData.kind).toBe('landing')
    expect(props.pageData.landingData).toBeDefined()
  })

  test('spanish landing page', async () => {
    const props = await getInitialProps('/es/')
    expect(props.instanceData.lang).toBe('es')
    expect(props.pageData.kind).toBe('landing')
    expect(props.pageData.landingData).toBeDefined()
  })

  test('french landing page', async () => {
    const props = await getInitialProps('/fr/')
    expect(props.instanceData.lang).toBe('fr')
    expect(props.pageData.kind).toBe('landing')
    expect(props.pageData.landingData).toBeDefined()
  })

  test('hindi landing page', async () => {
    const props = await getInitialProps('/hi/')
    expect(props.instanceData.lang).toBe('hi')
    expect(props.pageData.kind).toBe('landing')
    expect(props.pageData.landingData).toBeDefined()
  })

  test('tamil landing page', async () => {
    const props = await getInitialProps('/ta/')
    expect(props.instanceData.lang).toBe('ta')
    expect(props.pageData.kind).toBe('landing')
    expect(props.pageData.landingData).toBeDefined()
  })
})

describe('custom build pages', () => {
  test('german donation page', async () => {
    const props = await getInitialProps('/de/spenden')
    expect(props.pageData).toEqual({ kind: 'donation' })
  })

  test('search page de', async () => {
    const props = await getInitialProps('/de/search')
    expect(props.pageData).toEqual({ kind: 'search' })
  })

  test('search page another language (en)', async () => {
    const props = await getInitialProps('/en/search')
    expect(props.pageData).toEqual({ kind: 'search' })
  })

  test('notifications', async () => {
    const props = await getInitialProps('/de/user/notifications')
    expect(props.pageData).toEqual({ kind: 'user/notifications' })
  })
})

describe('error page', () => {
  test('unknown alias', async () => {
    const props = await getInitialProps('/this/does/not/exists')
    expect(props.pageData.kind).toBe('error')
    expect(props.pageData.errorData.code).toBe(404)
  })
})

describe('entities', () => {
  test('page: math starting page', async () => {
    const props = await getInitialProps('/de/mathe')
    expect(props.pageData.kind).toBe('single-entity')
  })

  /*test('exercise', async () => {
    const props = await getInitialProps('/de/54210')
    expect(props.pageData.kind).toBe('single-entity')
  })*/
})

describe('entity data', () => {
  test('page: id, title, content', async () => {
    const props = await getInitialProps('/de/mathe')
    expect(props.pageData.entityData).toBeDefined()

    const entityData = props.pageData.entityData
    expect(entityData.id).toBe(19767)
    expect(entityData.title).toBe('Mathematik')
    expect(entityData.content).toBeDefined()
    entityData.content.forEach((node) => {
      expect(node.type).toBeDefined()
    })
  })
})

describe('secondary navigation & breadcrumbs', () => {
  test('page: secondary navigation, no breadcrumbs', async () => {
    const props = await getInitialProps('/de/mathe')

    expect(props.pageData.secondaryNavigationData).toBeDefined()
    expect(props.pageData.breadcrumbsData).toBeUndefined()

    props.pageData.secondaryNavigationData.forEach((entry) => {
      expect(entry.active).toBe(false)
      expect(entry.title).toBeDefined()
      expect(entry.url).toBeDefined()
    })
  })
})

describe('meta data & etc.', () => {
  test('page: title, ', async () => {
    const props = await getInitialProps('/de/mathe')

    expect(props.pageData.metaData.title).toBe('Mathematik - lernen mit Serlo!')
    expect(props.pageData.metaData.contentType).toBe('page')
    expect(
      props.pageData.metaData.metaImage.includes('/meta/mathematik.jpg')
    ).toBe(true)
    expect(
      props.pageData.metaData.metaDescription.includes(
        'Im Mathematik-Bereich von Serlo'
      )
    ).toBe(true)

    expect(props.pageData.newsletterPopup).toBe(true)
    expect(props.pageData.cacheKey).toBeDefined()
    expect(props.pageData.horizonData).toHaveLength(3)
    props.pageData.horizonData.forEach((horizonEntry) => {
      expect(horizonEntry.title).toBeDefined()
      expect(horizonEntry.text).toBeDefined()
      expect(horizonEntry.imageUrl).toBeDefined()
      expect(horizonEntry.url).toBeDefined()
    })
  })
})

const cache = {}

async function getInitialProps(alias) {
  if (cache[alias]) return cache[alias]
  const res = await fetch('http://localhost:3000' + alias)
  const html = await res.text()
  const indexOfStartTag = html.indexOf('__NEXT_DATA__')
  const startIndex = html.indexOf('>', indexOfStartTag) + 1
  const endIndex = html.indexOf('</script>', startIndex)
  const json = html.substring(startIndex, endIndex)
  const props = JSON.parse(json).props.pageProps
  cache[alias] = props
  return props
}
