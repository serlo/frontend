export function getSubjectSlug(name: string) {
  return encodeURI(name.toLowerCase())
}
