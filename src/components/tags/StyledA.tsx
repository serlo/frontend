import styled from 'styled-components'
import { darken } from 'polished'

export const StyledA = styled.a`
  color: ${props => props.theme.colors.linkColor};
  text-decoration: none;
  font-weight: normal;
  &:visited {
    color: ${props => darken(0.1, props.theme.colors.linkColor)};
  }
  &:hover {
    color: ${props => props.theme.colors.brand};
    text-decoration: underline;
  }
`
