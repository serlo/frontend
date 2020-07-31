/* eslint-disable */

const fetch = require('node-fetch')

// some samples of integration tests for the frontend fetcher

test('the data is peanut butter', async () => {
  const json = await getInitialProps('/')
  console.log(json)
  expect(json).toBe('peanut butter')
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
