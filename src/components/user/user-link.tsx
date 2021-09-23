import AuthorBadge from '@/assets-webkit/img/community/badge-author.svg'
import DonorBadge from '@/assets-webkit/img/community/badge-donor.svg'
import ReviewerBadge from '@/assets-webkit/img/community/badge-reviewer.svg'
import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'
import { FrontendUserData } from '@/data-types'
import { NodePath } from '@/schema/article-renderer'

export interface UserLinkProps {
  user: FrontendUserData
  withIcon?: boolean
  noBadges?: boolean
  className?: string
  path?: NodePath
}

export function UserLink({
  user,
  withIcon,
  noBadges,
  className,
  path,
}: UserLinkProps) {
  const { strings } = useInstanceData()

  return (
    <>
      <Link
        href={`/user/${user.id}/${user.username}`}
        className={className}
        path={path ?? []}
      >
        {withIcon && (
          <img
            className="w-9 rounded-full mr-2 align-middle"
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
        <style jsx>{`
          .badges-wrap {
            display: inline-block;
            vertical-align: sub;
            margin-left: 3px;
            :global(> span > svg) {
              width: 1.1em;
              height: auto;
              margin-left: 0.3em;
              display: inline;
            }
          }
        `}</style>
        <span className="badges-wrap">
          {user.isActiveReviewer && (
            <span title={strings.roles.reviewer}>
              <ReviewerBadge />
            </span>
          )}
          {user.isActiveAuthor && (
            <span title={strings.roles.author}>
              <AuthorBadge />
            </span>
          )}
          {user.isActiveDonor && (
            <span title={strings.roles.donor}>
              <DonorBadge />
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
