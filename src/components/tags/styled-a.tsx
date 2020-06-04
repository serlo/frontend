import { darken } from 'polished'
import styled from 'styled-components'

export const StyledA = styled.a`
  color: ${props => props.theme.colors.linkColor};
  text-decoration: none;
  word-break: break-word;

  &:visited {
    /* color: ${props => darken(0.15, props.theme.colors.linkColor)}; */
  }
  &:hover {
    text-decoration: underline;
  }
`
