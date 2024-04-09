export function getCleanUrl(inputUrl: string, instance?: string) {
  const testId = parseInt(
    inputUrl.match(
      /https?:\/\/([a-z]{2}\.)?serlo\.org(\/[a-z]+)?\/([1-9]?[0-9]+)/
    )?.[3] ?? 'NaN'
  )

  const hashPart = inputUrl.split('#')[1]
  const hash = hashPart ? `#${hashPart}` : ''

  if (!isNaN(testId)) return `/${testId}${hash}`

  const cleanedUrl = instance
    ? inputUrl
        .replace('https://serlo.org/', '')
        .replace(`https://${instance}.serlo.org/`, '')
        .replace(/^serlo\.org\//, '')
    : inputUrl.replace(/(https:\/\/)?([a-z]+\.)?serlo.org/, '')

  return inputUrl !== cleanedUrl ? `/${cleanedUrl}${hash}` : inputUrl
}
