import { NextPage } from 'next'
import React from 'react'
import styled from 'styled-components'

import { CommunityBanner } from './community-banner'
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
  const { lang } = useInstanceData()
  const { username, description, lastLogin } = userData

  const lastLoginDate = lastLogin ? new Date(lastLogin) : undefined

  return (
    <RelativeContainer>
      <MaxWidthDiv>
        <HSpace amount={50} />
        <StyledH1>{username}</StyledH1>
        <StyledP></StyledP>
        {lang === 'de' && <CommunityBanner userData={userData} />}

        {description && (
          <>
            <StyledH2>Über mich</StyledH2>
            {renderArticle(description)}
          </>
        )}

        {/* <StyledH2>Statistiken</StyledH2> */}
        {/* <StyledH2>Aktuelle Aktivitäten</StyledH2> */}

        {lastLoginDate && (
          <Gray>
            Zuletzt eingeloggt:{' '}
            <b>
              <TimeAgo datetime={lastLoginDate} dateAsTitle />
            </b>
          </Gray>
        )}

        {/* <StyledH2>Rollen</StyledH2> */}
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

// const ColoredIcon = styled.span`
//   color: ${(props) => props.theme.colors.brand};
// `

// const Wrapper = styled.div`
//   margin-bottom: 80px;
// `

// const Button = styled.button`
//   ${inputFontReset}
//   ${makeDefaultButton}
//   margin-top: 40px;
//   font-weight: bold;
//   background-color: ${(props) => props.theme.colors.brand};
//   color: #fff;
//   &:hover {
//     background-color: ${(props) => props.theme.colors.lightblue};
//   }
// `
