import { NextPage } from 'next'
import React from 'react'
import styled from 'styled-components'

import { ProfileCommunityBanner } from './profile-community-banner'
import { HSpace } from '@/components/content/h-space'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { RelativeContainer } from '@/components/navigation/relative-container'
import { StyledH1 } from '@/components/tags/styled-h1'
import { StyledH2 } from '@/components/tags/styled-h2'
import { StyledP } from '@/components/tags/styled-p'
import { TimeAgo } from '@/components/time-ago'
import { useInstanceData } from '@/contexts/instance-context'
import { UserPage } from '@/data-types'
import { renderArticle } from '@/schema/article-renderer'

export interface ProfileProps {
  userData: UserPage['userData']
}

export const Profile: NextPage<ProfileProps> = ({ userData }) => {
  const { lang, strings } = useInstanceData()
  const { username, description, lastLogin } = userData

  const lastLoginDate = lastLogin ? new Date(lastLogin) : undefined

  return (
    <RelativeContainer>
      <MaxWidthDiv>
        <HSpace amount={50} />
        <StyledH1>{username}</StyledH1>
        <StyledP></StyledP>
        {lang === 'de' && <ProfileCommunityBanner userData={userData} />}

        {description && (
          <>
            <StyledH2>{strings.profiles.aboutMe}</StyledH2>
            {renderArticle(description)}
          </>
        )}

        {/* <StyledH2>{strings.profiles.recentActivities}</StyledH2> */}

        {lastLoginDate && (
          <Gray>
            {strings.profiles.lastSeen}:{' '}
            <b>
              <TimeAgo datetime={lastLoginDate} dateAsTitle />
            </b>
          </Gray>
        )}

        {/* <StyledH2>{strings.profiles.roles}</StyledH2> */}

        <HSpace amount={100} />
      </MaxWidthDiv>
    </RelativeContainer>
  )
}

const Gray = styled(StyledP)`
  margin-top: 70px;
  font-size: 0.9rem;
  color: #777;
`
