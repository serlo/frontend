import { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'

import { ProfileCommunityBanner } from './profile-community-banner'
import { ProfileDonationForm } from './profile-donation-form'
import { useAuth } from '@/auth/use-auth'
import { CommentArea } from '@/components/comments/comment-area'
import { StyledH1 } from '@/components/tags/styled-h1'
import { StyledH2 } from '@/components/tags/styled-h2'
import { StyledP } from '@/components/tags/styled-p'
import { TimeAgo } from '@/components/time-ago'
import { UserTools } from '@/components/user-tools/user-tools'
import { useInstanceData } from '@/contexts/instance-context'
import { UserPage } from '@/data-types'
import { renderArticle } from '@/schema/article-renderer'

export interface ProfileProps {
  userData: UserPage['userData']
}

export const Profile: NextPage<ProfileProps> = ({ userData }) => {
  const { strings } = useInstanceData()
  const { id, username, description, lastLogin, imageUrl, date } = userData
  const auth = useAuth()
  const isOwnProfile = auth.current?.username === username

  const lastLoginDate = lastLogin ? new Date(lastLogin) : undefined
  const sinceYear = new Date(date).getFullYear()

  return (
    <>
      <Head>
        <title>{username}</title>
      </Head>

      <ProfileHeader>
        <ProfileImage src={imageUrl} />
        <div>
          <UsernameHeading>{username}</UsernameHeading>
          <StyledP>Bei Serlo seit {sinceYear}</StyledP>
        </div>
      </ProfileHeader>

      {/*lang === 'de' && renderCommunityFeatures()*/}
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

  function renderCommunityFeatures() {
    return (
      <>
        <ProfileCommunityBanner
          userData={userData}
          isOwnProfile={isOwnProfile}
        />
        {isOwnProfile && (
          <ProfileDonationForm
            username={username}
            userId={userData.id}
            activeDonor={userData.activeDonor || false}
            isCommunity={
              userData.activeReviewer || userData.activeAuthor || false
            }
          />
        )}
      </>
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
  width: 160px;
`

const ProfileHeader = styled.header`
  margin-top: 40px;
  margin-bottom: 20px;

  @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: flex;
    align-items: center;

    & > ${ProfileImage} {
      margin-right: 40px;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    & > * {
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
  }
`

const UsernameHeading = styled(StyledH1)`
  font-weight: normal;
  margin-bottom: 10px;
`

const Gray = styled(StyledP)`
  margin-top: 70px;
  font-size: 0.9rem;
  color: #777;
`
