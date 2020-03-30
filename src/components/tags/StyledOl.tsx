import styled from 'styled-components'
import { makeMargin } from '../../helper/csshelper'

export const StyledOl = styled.ol`
  ${makeMargin}
  margin-bottom: ${props => props.theme.spacing.mb.block};
  margin-top: 0;
`
