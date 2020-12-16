import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import React from 'react'
import styled from 'styled-components'

import { useAuth } from '@/auth/use-auth'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { RelativeContainer } from '@/components/navigation/relative-container'

//fallback for legacy routes /user/me and /user/public

export const ProfileRedirectMe: NextPage = () => {
  const auth = useAuth()

  React.useEffect(() => {
    if (auth.current) {
      window.location.replace('/user/profile/' + auth.current.username)
    } else {
      window.location.replace('/api/auth/login')
    }
  }, [auth])

  return (
    <RelativeContainer>
      <MaxWidthDiv>
        <ColoredIcon>
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </ColoredIcon>
      </MaxWidthDiv>
    </RelativeContainer>
  )
}

const ColoredIcon = styled.div`
  color: ${(props) => props.theme.colors.brand};
  text-align: center;
  margin-top: 50px;
`
