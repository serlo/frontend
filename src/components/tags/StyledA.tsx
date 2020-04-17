import styled from 'styled-components'
import { darken } from 'polished'

const StyledA = styled.a`
  color: ${props => darken(0.1, props.theme.colors.brand)};
  text-decoration: none;
  font-weight: normal;
  &:visited {
    color: ${props => darken(0.15, props.theme.colors.linkColor)};
  }
  &:hover {
    text-decoration: underline;
  }
`

export default StyledA
