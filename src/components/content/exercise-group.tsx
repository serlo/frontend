import React from 'react'
import styled from 'styled-components'

import { makeMargin } from '../../helper/css'
import { AuthorTools } from './author-tools'
import { ExerciseNumbering } from './exercise-numbering'
import { SpoilerContainer } from './spoiler-container'
import { useAuth } from '@/auth/use-auth'
import { useInstanceData } from '@/contexts/instance-context'

export interface ExerciseGroupProps {
  children: React.ReactNode
  license: React.ReactNode
  groupIntro: React.ReactNode
  positionOnPage: number
}

export function ExerciseGroup({
  children,
  license,
  groupIntro,
  positionOnPage,
}: ExerciseGroupProps) {
  const [loaded, setLoaded] = React.useState(false)
  React.useEffect(() => {
    setLoaded(true)
  }, [])
  const { strings } = useInstanceData()
  const auth = useAuth()
  return (
    <Container>
      <ExerciseIntro>
        <ExerciseNumbering index={positionOnPage} />

        <TopLine>
          <Label>{strings.content.exerciseGroup}</Label>
          <div>{license}</div>
          {loaded && auth.current && <AuthorTools />}
        </TopLine>

        {groupIntro}
      </ExerciseIntro>
      <Content>{children}</Content>
    </Container>
  )
}

const TopLine = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3px;
`

const Container = styled(SpoilerContainer)`
  padding-top: 4px;
  border-left: 8px solid ${(props) => props.theme.colors.lightBlueBackground};

  margin: 40px 0;
`

const ExerciseIntro = styled.div`
  padding-top: 8px;
  margin-bottom: 12px;
`

const Content = styled.div`
  padding-bottom: 14px;
  background-color: #fff;
  margin: 0 8px 10px 8px;
  padding-left: 8px;
`

const Label = styled.small`
  font-size: 0.9rem;
  font-weight: bold;
  ${makeMargin}
  margin-right: auto;
  display: block;
  margin-bottom: 7px;
  color: ${(props) => props.theme.colors.brand};
`
