import styled from 'styled-components'
import { makeMargin } from '../../helper/csshelper'

const StyledP = styled.p`
  ${makeMargin}
  margin-top: 0;
  margin-bottom: ${props => props.theme.spacing.mb.block};
  hyphens: auto;
  line-height: 1.3;
  font-size: 1.125rem;
`

export default StyledP
