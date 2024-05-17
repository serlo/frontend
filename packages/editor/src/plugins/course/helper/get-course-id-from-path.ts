export function getCourseIdFromPath(path: string) {
  const coursePageId = path.split('/').at(-1)?.split('-')[0]
  return coursePageId?.length ? coursePageId : undefined
}
