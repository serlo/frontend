import styled from 'styled-components'

import SpoilerContainer from './SpoilerContainer'
import SpoilerTitle from './SpoilerTitle'

export default function ExerciseGroup({ children, license }) {
  return (
    <Container>
      <SpoilerTitle open disabled>
        <Label>Aufgabengruppe</Label>
      </SpoilerTitle>
      <Content>{children}</Content>
      <div>{license}</div>
    </Container>
  )
}

const Container = styled(SpoilerContainer)`
  padding-bottom: 10px;
  background-color: ${props => props.theme.colors.lightBlueBackground};
`

const Content = styled.div`
  padding-top: 24px;
  padding-bottom: 14px;
  background-color: #fff;
  margin: 0 0 10px 8px;
`

const Label = styled.small`
  font-size: 0.9rem;
  margin-left: 7px;
  text-align: right;
`
