export function getCoursePageIdFromPath(path: string) {
  const regex =
    /^\/(?<subject>[^/]+\/)?(?<courseId>\d+)\/(?<coursePageId>[0-9a-f]+)\/(?<title>[^/]*)$/
  const match = regex.exec(path)
  if (match && match.groups) return match.groups.coursePageId
  const hashId = path.split('#')[1]
  if (hashId) return hashId
}
