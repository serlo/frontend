import React from 'react'
import styled from 'styled-components'

import { makeMargin } from '../../helper/css'
import { ExerciseNumbering } from './exercise-numbering'
import { SpoilerContainer } from './spoiler-container'

// TODO: needs type declaration
type ExerciseGroupProps = any

export function ExerciseGroup({
  children,
  license,
  groupIntro,
  positionOnPage,
}: ExerciseGroupProps) {
  return (
    <Container>
      <ExerciseIntro>
        <ExerciseNumbering index={positionOnPage} />
        <Label>Aufgabengruppe</Label>
        {groupIntro}
      </ExerciseIntro>
      <Content>{children}</Content>
      <div>{license}</div>
    </Container>
  )
}

const Container = styled(SpoilerContainer)`
  padding-top: 4px;
  border-left: 8px solid ${(props) => props.theme.colors.lightBlueBackground};

  margin: 40px 0;
`

const ExerciseIntro = styled.div`
  padding-top: 12px;
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
  display: block;
  margin-bottom: 7px;
  color: ${(props) => props.theme.colors.brand};
`
