import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import AuthorBadge from '@/assets-webkit/img/community/badge-author.svg'
import DonorBadge from '@/assets-webkit/img/community/badge-donor.svg'
import ReviewerBadge from '@/assets-webkit/img/community/badge-reviewer.svg'
import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'
import { FrontendUserData } from '@/data-types'

export interface UserLinkProps {
  user: FrontendUserData
  withIcon?: boolean
  className?: string
}

export function UserLink({ user, withIcon, className }: UserLinkProps) {
  const { strings } = useInstanceData()
  return (
    <>
      <Link href={`/user/profile/${user.id}`} className={className}>
        {withIcon && <StyledFontAwesomeIcon icon={faUser} />}
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

const BadgesWrap = styled.div`
  display: inline-block;
  vertical-align: sub;
  > span > svg {
    width: 1.2em;
    height: auto;
    margin-left: 0.3em;
  }
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`
