export function getCleanUrl(
  inputUrl: string,
  instance?: string,
  yieldAbsoluteUrl: boolean = false
) {
  const isJustId = /^\/[1-9][0-9]*$/.test(inputUrl)
  if (isJustId && yieldAbsoluteUrl) {
    const domain = instance ? `${instance}.serlo.org` : 'serlo.org'
    return `https://${domain}${inputUrl}`
  }
  const serloContentMatch = inputUrl.match(
    /https?:\/\/([a-z]{2}\.)?serlo\.org(\/[a-z]+)?\/([1-9]?[0-9]+)/
  )
  const testId = parseInt(serloContentMatch?.[3] ?? 'NaN')

  const hashPart = inputUrl.split('#')[1]
  const hash = hashPart ? `#${hashPart}` : ''

  // If yieldAbsoluteUrl is true and it's a Serlo content URL, we want to keep
  // the absolute URL instead of replacing it with a relative one!
  if (yieldAbsoluteUrl && !isNaN(testId)) {
    return (serloContentMatch ? serloContentMatch[0] : inputUrl) + hash
  }

  if (!isNaN(testId)) return `/${testId}${hash}`

  const cleanedUrl = instance
    ? inputUrl
        .replace('https://serlo.org/', '')
        .replace(`https://${instance}.serlo.org/`, '')
        .replace(/^serlo\.org\//, '')
    : inputUrl.replace(/(https:\/\/)?([a-z]+\.)?serlo.org/, '')

  return inputUrl !== cleanedUrl ? `/${cleanedUrl}${hash}` : inputUrl
}
