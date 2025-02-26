export function getEditUrl(repositoryId: number, revisionId?: number) {
  return `/entity/repository/add-revision/${repositoryId}${
    revisionId ? `/${revisionId}` : ''
  }`
}
