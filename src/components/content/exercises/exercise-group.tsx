import React from 'react'
import styled from 'styled-components'

import { ExerciseAuthorTools } from './exercise-author-tools'
import { ExerciseNumbering } from './exercise-numbering'
import { useAuth } from '@/auth/use-auth'

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
          {loaded && auth.current && (
            <ExerciseAuthorTools data={{ type: '_ExerciseGroupInline', id }} />
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
