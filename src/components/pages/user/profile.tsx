import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'

import AuthorBadge from '@/assets-webkit/img/community/badge-author.svg'
import DonorBadge from '@/assets-webkit/img/community/badge-donor.svg'
import ReviewerBadge from '@/assets-webkit/img/community/badge-reviewer.svg'
import { useAuth } from '@/auth/use-auth'
import { CommentArea } from '@/components/comments/comment-area'
import { StyledH1 } from '@/components/tags/styled-h1'
import { StyledH2 } from '@/components/tags/styled-h2'
import { StyledP } from '@/components/tags/styled-p'
import { TimeAgo } from '@/components/time-ago'
import { UserTools } from '@/components/user-tools/user-tools'
import { useInstanceData } from '@/contexts/instance-context'
import { UserPage } from '@/data-types'
import { makeGreenButton } from '@/helper/css'
import { renderArticle } from '@/schema/article-renderer'

export interface ProfileProps {
  userData: UserPage['userData']
}

export const Profile: NextPage<ProfileProps> = ({ userData }) => {
  const { strings } = useInstanceData()
  const { id, username, description, lastLogin, imageUrl, date } = userData
  const { activeDonor, activeReviewer, activeAuthor } = userData
  const auth = useAuth()
  const isOwnProfile = auth.current?.username === username

  const lastLoginDate = lastLogin ? new Date(lastLogin) : undefined
  const sinceYear = new Date(date).getFullYear()

  return (
    <>
      <Head>
        <title>{username}</title>
        {!activeDonor && !activeAuthor && !activeReviewer && (
          <meta name="robots" content="noindex" />
        )}
      </Head>

      <ProfileHeader>
        <ProfileImage src={imageUrl} />
        <div>
          <UsernameHeading>{username}</UsernameHeading>
          <StyledP>
            {strings.profiles.activeSince} {sinceYear}
          </StyledP>
        </div>
        {renderBadges()}
      </ProfileHeader>
      {renderChatButton()}

      {description && (
        <>
          <StyledH2>{strings.profiles.aboutMe}</StyledH2>
          {renderArticle(description, `profile${id}`)}
        </>
      )}
      <CommentArea id={id} noForms />
      {lastLoginDate && (
        <Gray>
          {strings.profiles.lastSeen}:{' '}
          <b>
            <TimeAgo datetime={lastLoginDate} dateAsTitle />
          </b>
        </Gray>
      )}
      {renderUserTools()}
    </>
  )

  function renderBadges() {
    if (!activeAuthor && !activeReviewer && !activeDonor) return null

    return (
      <BadgesContainer>
        {activeReviewer &&
          renderBadge({ Badge: ReviewerBadge, name: strings.roles.reviewer })}
        {activeAuthor &&
          renderBadge({ Badge: AuthorBadge, name: strings.roles.author })}
        {activeDonor &&
          renderBadge({ Badge: DonorBadge, name: strings.roles.donor })}
      </BadgesContainer>
    )
  }

  function renderBadge({
    Badge,
    name,
  }: {
    Badge: typeof ReviewerBadge | typeof AuthorBadge | typeof DonorBadge
    name: string
  }) {
    return (
      <BadgeContainer>
        <Badge />
        <StyledP>{name}</StyledP>
      </BadgeContainer>
    )
  }

  function renderChatButton() {
    const chatUrl = `https://community.serlo.org/direct/${username}`

    return (
      <ChatButton href={chatUrl} role="button">
        {strings.profiles.directMessage}{' '}
        <FontAwesomeIcon icon={faTelegramPlane} />
      </ChatButton>
    )
  }

  function renderUserTools() {
    if (!isOwnProfile) return null
    return (
      <UserTools
        id={id}
        hideEdit={false}
        data={{
          type: 'Profile',
          id: id,
        }}
      />
    )
  }
}

const ProfileImage = styled.img`
  border-radius: 50%;
  display: block;
  /* This width matches the width of the direct chat button -> TODO: find a better solution */
  width: 191px;
`

const ProfileHeader = styled.header`
  margin-top: 40px;
  margin-bottom: 20px;

  @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: flex;
    flex-flow: row wrap;
    align-items: center;

    & > * {
      margin-right: 20px;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    & > * {
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
  }

  & svg,
  & h1 {
    height: 40px;
    margin-top: 15px;
    margin-bottom: 10px;
  }
`

const BadgesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const BadgeContainer = styled.div`
  margin-right: 20px;

  & > * {
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
`

const ChatButton = styled.a`
  ${makeGreenButton}
  display: block;
  width: 175px;
  text-align: center;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-left: auto;
    margin-right: auto;
  }
`

const UsernameHeading = styled(StyledH1)`
  font-weight: normal;
`

const Gray = styled(StyledP)`
  margin-top: 70px;
  font-size: 0.9rem;
  color: #777;
`
