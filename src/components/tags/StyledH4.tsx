import styled from 'styled-components'
import { makeMargin } from '../../helper/csshelper'

export const StyledH4 = styled.h4`
  ${makeMargin}
  margin-top: 0;
  margin-bottom: ${props => props.theme.spacing.mb.h4};
  font-size: 1.1875rem;
  line-height: 1.22;
`
