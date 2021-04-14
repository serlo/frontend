import { NextPage } from 'next'
import styled from 'styled-components'

import { ProfileCommunityBanner } from './profile-community-banner'
import { ProfileDonationForm } from './profile-donation-form'
import { useAuth } from '@/auth/use-auth'
import { CommentArea } from '@/components/comments/comment-area'
import { PageTitle } from '@/components/content/page-title'
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
  const { lang, strings } = useInstanceData()
  const { id, username, description, lastLogin } = userData
  const auth = useAuth()
  const isOwnProfile = auth.current?.username === username

  const lastLoginDate = lastLogin ? new Date(lastLogin) : undefined

  return (
    <>
      <PageTitle title={username} headTitle />
      {lang === 'de' && renderCommunityFeatures()}
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

const Gray = styled(StyledP)`
  margin-top: 70px;
  font-size: 0.9rem;
  color: #777;
`
