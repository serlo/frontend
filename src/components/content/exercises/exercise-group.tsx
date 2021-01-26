import React from 'react'
import styled from 'styled-components'

import { ExerciseNumbering } from './exercise-numbering'
import { useAuth } from '@/auth/use-auth'
import { useLoggedInComponents } from '@/contexts/logged-in-components'

export interface ExerciseGroupProps {
  children: React.ReactNode
  license: React.ReactNode
  groupIntro: React.ReactNode
  positionOnPage?: number
  id: number
  href?: string
}

export function ExerciseGroup({
  children,
  license,
  groupIntro,
  positionOnPage,
  id,
  href,
}: ExerciseGroupProps) {
  const [loaded, setLoaded] = React.useState(false)
  React.useEffect(() => {
    setLoaded(true)
  }, [])
  const auth = useAuth()
  const lic = useLoggedInComponents()
  const Comp = lic?.ExerciseAuthorTools
  return (
    <Container>
      <ExerciseIntro>
        {positionOnPage !== undefined && (
          <ExerciseNumbering
            index={positionOnPage}
            href={href ? href : `/${id}`}
          />
        )}
        <TopLine>
          <IntroWrapper>{groupIntro}</IntroWrapper>
          <div>{license}</div>
          {loaded && auth.current && Comp && (
            <Comp data={{ type: '_ExerciseGroupInline', id }} />
          )}
        </TopLine>
      </ExerciseIntro>
      <Content>{children}</Content>
    </Container>
  )
}

const TopLine = styled.div`
  display: flex;
  margin-bottom: 3px;
`

const IntroWrapper = styled.div`
  flex-grow: 1;
`

const Container = styled.div`
  padding-top: 4px;
`

const ExerciseIntro = styled.div`
  padding-top: 8px;
  margin-bottom: 12px;
`

const Content = styled.div`
  padding-bottom: 14px;
  background-color: #fff;
  margin: 0 8px 10px 8px;

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    padding-left: 50px;
  }
`
