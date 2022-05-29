import { shouldUseFeature } from '@/components/user/profile-experimental'

export function getRevisionEditUrl(
  isPage: boolean,
  repositoryId: number,
  revisionId?: number
) {
  if (!revisionId) return undefined
  if (isPage && !shouldUseFeature('addRevisionMutation'))
    return `/page/revision/create-old/${repositoryId}/${revisionId}`

  return `/entity/repository/add-revision/${repositoryId}/${revisionId}`
}
