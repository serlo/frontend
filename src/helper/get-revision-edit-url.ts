export function getRevisionEditUrl(
  isPage: boolean,
  repositoryId: number,
  revisionId: number
) {
  return isPage
    ? `/page/revision/create-old/${repositoryId}/${revisionId}`
    : `/entity/repository/add-revision/${repositoryId}/${revisionId}`
}
