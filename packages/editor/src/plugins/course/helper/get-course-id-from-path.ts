export function getCoursePageIdFromPath(path: string) {
  const regex =
    /^\/(?<subject>[^/]+\/)?(?<courseId>\d+)\/(?<coursePageId>[0-9a-f]+)\/(?<title>[^/]*)$/
  const match = regex.exec(path)
  if (match && match.groups) return match.groups.coursePageId
  const hashId = path.split('#')[1]
  if (hashId) return hashId
}

export function buildCoursePageUrl(
  courseAlias: string,
  coursePageId: string,
  title: string
) {
  const aliasParts = courseAlias.split('/')
  if (aliasParts.length !== 4) {
    throw new Error('Invalid course alias')
  }
  const base = aliasParts.slice(0, -1).join('/')
  return `${base}/${coursePageId.split('-')[0]}/${toSlug(title)}`
}

// Copied from https://github.com/serlo/api.serlo.org/blob/ce94045b513e59da1ddd191b498fe01f6ff6aa0a/packages/server/src/schema/uuid/abstract-uuid/resolvers.ts#L685-L703
function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/ /g, '-') // replace spaces with hyphens
    .replace(/[^\w-]+/g, '') // remove all non-word chars including _
    .replace(/--+/g, '-') // replace multiple hyphens
    .replace(/^-+/, '') // trim starting hyphen
    .replace(/-+$/, '') // trim end hyphen
}
