import React from 'react'
import styled from 'styled-components'
import TimeAgo from 'timeago-react'

import { HSpace } from '@/components/content/h-space'
import { Link } from '@/components/content/link'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { RelativeContainer } from '@/components/navigation/relative-container'
import { StyledH1 } from '@/components/tags/styled-h1'
import { StyledH2 } from '@/components/tags/styled-h2'
import { StyledP } from '@/components/tags/styled-p'
import { useInstanceData } from '@/contexts/instance-context'
import { UserData } from '@/data-types'
import { inputFontReset, makeDefaultButton } from '@/helper/css'

export const Profile = ({ userData }: { userData: UserData }) => {
  const { lang, strings } = useInstanceData()

  const lastLoginDate = new Date(userData.lastLogin)

  console.log(userData)
  return (
    <RelativeContainer>
      <MaxWidthDiv>
        <HSpace amount={50} />
        <StyledH1>{userData.username}</StyledH1>
        <StyledP>…</StyledP>
        <StyledH2>Über mich</StyledH2>
        <StyledH2>Statistiken</StyledH2>
        {/* <StyledH2>Aktuelle Aktivitäten</StyledH2> */}

        <StyledH2>Zuletzt eingeloggt</StyledH2>
        <StyledP>
          <b title={lastLoginDate.toLocaleString(lang)}>
            <TimeAgo
              datetime={lastLoginDate}
              locale={lang}
              opts={{ minInterval: 60 }}
            />
          </b>
        </StyledP>
        {/* <StyledH2>Rollen</StyledH2> */}
        <HSpace amount={100} />
      </MaxWidthDiv>
    </RelativeContainer>
  )
}

const ColoredIcon = styled.span`
  color: ${(props) => props.theme.colors.brand};
`

const Wrapper = styled.div`
  margin-bottom: 80px;
`

const Button = styled.button`
  ${inputFontReset}
  ${makeDefaultButton}
  margin-top: 40px;
  font-weight: bold;
  background-color: ${(props) => props.theme.colors.brand};
  color: #fff;
  &:hover {
    background-color: ${(props) => props.theme.colors.lightblue};
  }
`
