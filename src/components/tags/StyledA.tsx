import styled from 'styled-components'
import { darken } from 'polished'

const StyledA = styled.a`
  color: ${props => props.theme.colors.linkColor};
  text-decoration: none;
  font-weight: normal;
  &:visited {
    color: ${props => props.theme.colors.linkHoverColor};
  }
  &:hover {
    color: ${props => props.theme.colors.linkHoverColor};
    text-decoration: underline;
  }
`

export default StyledA
