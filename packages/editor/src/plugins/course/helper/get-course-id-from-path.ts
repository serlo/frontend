export function getCoursePageIdFromPath(path: string) {
  const parts = path.split('/')
  if (parts.length < 3) return undefined

  const coursePageId = path.split('/').at(-1)?.split('-')[0]
  return coursePageId?.length ? coursePageId : undefined
}

// TODO: adapt to final alias format
export function buildNewPathWithCourseId(
  path: string,
  title: string,
  id: string
) {
  const parts = path.split('/')
  const base = (parts.length > 2 ? parts.slice(0, -1) : parts).join('/')

  const slugTitle = title
    .toLocaleLowerCase()
    .replace(/['"`=+*&^%$#@!.<>?]/g, '')
    .replace(/[[\]{}() ,;:/|-]+/g, '-')

  return `${base}/${id}-${slugTitle}`
}
