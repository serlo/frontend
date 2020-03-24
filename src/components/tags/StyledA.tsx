import styled from 'styled-components'
import { darken } from 'polished'

export const StyledA = styled.a`
  color: ${props => darken(0.05, props.theme.colors.brandGreen)};
  text-decoration: none;
  font-weight: bold;
  &:visited {
    color: ${props => darken(0.2, props.theme.colors.brandGreen)};
  }
`
