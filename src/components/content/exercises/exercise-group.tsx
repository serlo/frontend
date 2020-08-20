import React from 'react'
import styled from 'styled-components'

import { AuthorTools } from '../author-tools'
import { ExerciseNumbering } from './exercise-numbering'
import { useAuth } from '@/auth/use-auth'

export interface ExerciseGroupProps {
  children: React.ReactNode
  license: React.ReactNode
  groupIntro: React.ReactNode
  positionOnPage: number
  id: number
}

export function ExerciseGroup({
  children,
  license,
  groupIntro,
  positionOnPage,
  id,
}: ExerciseGroupProps) {
  const [loaded, setLoaded] = React.useState(false)
  React.useEffect(() => {
    setLoaded(true)
  }, [])
  const auth = useAuth()
  return (
    <Container>
      <ExerciseIntro>
        <ExerciseNumbering index={positionOnPage} />
        <TopLine>
          {loaded && auth.current && (
            <AuthorTools data={{ type: '_ExerciseGroupInline', id }} />
          )}
          {groupIntro}
          <div>{license}</div>
        </TopLine>
      </ExerciseIntro>
      <Content>{children}</Content>
    </Container>
  )
}

const TopLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
`

const Container = styled.div`
  padding-top: 4px;
  /* border-left: 8px solid ${(props) =>
    props.theme.colors.lightBlueBackground}; */

  /* margin: 40px 0; */
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
