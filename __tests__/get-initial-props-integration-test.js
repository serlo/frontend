/* eslint-disable */

const fetch = require('node-fetch')

// some samples of integration tests for the frontend fetcher

describe('integration test of frontend initial props', () => {
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

async function getInitialProps(alias) {
  const res = await fetch('http://localhost:3000' + alias)
  const html = await res.text()
  const indexOfStartTag = html.indexOf('__NEXT_DATA__')
  const startIndex = html.indexOf('>', indexOfStartTag) + 1
  const endIndex = html.indexOf('</script>', startIndex)
  const json = html.substring(startIndex, endIndex)
  return JSON.parse(json).props.pageProps
}
