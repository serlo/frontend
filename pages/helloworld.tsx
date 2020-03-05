import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

export default function HelloWorld(props) {
  return (
    <StyledParagraph>
      <FontAwesomeIcon icon="coffee" />
    </StyledParagraph>
  )
}

const StyledParagraph = styled.p`
  color: brown;
  text-align: center;
`
