export function getCleanUrl(inputUrl: string, instance: string) {
  const testId = parseInt(inputUrl.match(/[1-9]?[0-9]+/)?.[0] ?? 'NaN')

  const hashPart = inputUrl.split('#')[1]
  const hash = hashPart ? `#${hashPart}` : ''

  if (!isNaN(testId) && inputUrl.includes('serlo.org/'))
    return `/${testId}${hash}`

  const cleanedUrl = inputUrl
    .replace('https://serlo.org/', '')
    .replace(`https://${instance}.serlo.org/`, '')
    .replace(/^serlo\.org\//, '')

  return inputUrl !== cleanedUrl ? `/${cleanedUrl}${hash}` : inputUrl
}
