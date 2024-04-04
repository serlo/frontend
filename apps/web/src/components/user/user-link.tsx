import AuthorBadge from '@/assets-webkit/img/community/badge-author.svg'
import DonorBadge from '@/assets-webkit/img/community/badge-donor.svg'
import ReviewerBadge from '@/assets-webkit/img/community/badge-reviewer.svg'
import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'
import type { FrontendUserData } from '@/data-types'

export interface UserLinkProps {
  user: FrontendUserData
  withIcon?: boolean
  noBadges?: boolean
  className?: string
}

export function UserLink({
  user,
  withIcon,
  noBadges,
  className,
}: UserLinkProps) {
  const { strings } = useInstanceData()

  return (
    <>
      <Link href={`/user/${user.id}/${user.username}`} className={className}>
        {withIcon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="mr-2 w-9 rounded-full align-middle"
            src={getAvatarUrl(user.username)}
            alt={`User-Avatar: ${user.username}`}
          />
        )}
        {user.username}
        {!noBadges && renderBadges()}
      </Link>
    </>
  )

  function renderBadges() {
    return (
      <>
        <span className="ml-[3px] inline-block align-text-bottom">
          {user.isActiveReviewer && (
            <span title={strings.roles.reviewer}>
              <ReviewerBadge className="ml-1 inline h-auto w-4" />
            </span>
          )}
          {user.isActiveAuthor && (
            <span title={strings.roles.author}>
              <AuthorBadge className="ml-1 inline h-auto w-4" />
            </span>
          )}
          {user.isActiveDonor && (
            <span title={strings.roles.donor}>
              <DonorBadge className="ml-1 inline h-auto w-4" />
            </span>
          )}
        </span>
      </>
    )
  }
}

export function getAvatarUrl(username: string) {
  return `https://community.serlo.org/avatar/${username}`
}
