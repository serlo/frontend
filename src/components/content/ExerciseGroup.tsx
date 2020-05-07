import React from 'react'
import styled from 'styled-components'

import SpoilerContainer from './SpoilerContainer'
import SpoilerTitle from './SpoilerTitle'

export default function ExerciseGroup({ children, license, groupIntro }) {
  const groupChildren = React.Children.map(children, child => {
    return React.cloneElement(child, { inGroup: true }, null)
  })

  return (
    <Container>
      {/* <SpoilerTitle open disabled>
        <Label>Aufgabengruppe</Label>
      </SpoilerTitle> */}
      <ExerciseIntro>{groupIntro}</ExerciseIntro>
      <Content>{groupChildren}</Content>
      <div>{license}</div>
    </Container>
  )
}

const Container = styled(SpoilerContainer)`
  /* padding-bottom: 10px; */
  /* background-color: ${props => props.theme.colors.lightBlueBackground}; */
  padding-top: 10px;
  border-left: 8px solid ${props => props.theme.colors.lightBlueBackground};
`

const ExerciseIntro = styled.div`
  padding-top: 6px;
  margin-bottom: 12px;
  /* border-bottom: 8px solid ${props =>
    props.theme.colors.lightBlueBackground}; */
`

const Content = styled.div`
  /* padding-top: 24px; */
  padding-bottom: 14px;
  background-color: #fff;
  margin: 0 8px 10px 8px;
  padding-left: 8px;
`

const Label = styled.small`
  /* font-size: 0.9rem; */
  margin-left: 7px;
  /* text-align: right; */
`
