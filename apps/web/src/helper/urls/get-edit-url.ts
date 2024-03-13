export function getEditUrl(
  repositoryId: number,
  revisionId?: number,
  isTaxonomy?: boolean
) {
  if (isTaxonomy) return `/taxonomy/term/update/${repositoryId}`

  return `/entity/repository/add-revision/${repositoryId}${
    revisionId ? `/${revisionId}` : ''
  }`
}
