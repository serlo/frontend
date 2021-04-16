import styled from 'styled-components'

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
  className?: string
  path?: NodePath
}

export function UserLink({ user, withIcon, className, path }: UserLinkProps) {
  const { strings } = useInstanceData()
  const imageUrl = `https://community.serlo.org/avatar/${user.username}`

  return (
    <>
      <Link
        href={`/user/${user.id}/${user.username}`}
        className={className}
        path={path ?? []}
      >
        {withIcon && <UserImage src={imageUrl} />}
        {user.username}
        {renderBadges()}
      </Link>
    </>
  )

  function renderBadges() {
    return (
      <BadgesWrap>
        {user.activeReviewer && (
          <span title={strings.roles.reviewer}>
            <ReviewerBadge />
          </span>
        )}
        {user.activeAuthor && (
          <span title={strings.roles.author}>
            <AuthorBadge />
          </span>
        )}
        {user.activeDonor && (
          <span title={strings.roles.donor}>
            <DonorBadge />
          </span>
        )}
      </BadgesWrap>
    )
  }
}

const UserImage = styled.img`
  width: 36px;
  border-radius: 50%;
  margin-right: 0.5em;
  vertical-align: middle;
`

const BadgesWrap = styled.div`
  display: inline-block;
  vertical-align: sub;
  margin-left: 3px;
  > span > svg {
    width: 1.1em;
    height: auto;
    margin-left: 0.3em;
  }
`
