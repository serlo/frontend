export function getCourseIdFromPath(path: string) {
  const coursePageId = path.split('/').at(-1)?.split('-')[0]
  return coursePageId?.length ? coursePageId : undefined
}

export function buildNewPathWithCourseId(
  path: string,
  title: string,
  id: string
) {
  const base = path.split('/').slice(0, -1).join('/')
  const slugTitle = title
    .toLocaleLowerCase()
    .replace(/['"`=+*&^%$#@!.<>?]/g, '')
    .replace(/[[\]{}() ,;:/|-]+/g, '-')

  return `${base}/${id}-${slugTitle}`
}
