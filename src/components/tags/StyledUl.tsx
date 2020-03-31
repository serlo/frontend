import styled from 'styled-components'
import { makeMargin } from '../../helper/csshelper'

export const StyledUl = styled.ul`
  ${makeMargin}
  margin-bottom: ${props => props.theme.spacing.mb.block};
  margin-top: 0;
`
