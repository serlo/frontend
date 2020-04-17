import styled from 'styled-components'

interface ColProps {
  cSize: number
}

const Col = styled.div<ColProps>`
  @media (min-width: ${props => props.theme.breakpoints.mobile}) {
    box-sizing: border-box;
    flex-grow: ${props => props.cSize};
    flex-basis: 0;
    flex-shrink: 1;
    /* width: 0; */
  }
`

export default Col
