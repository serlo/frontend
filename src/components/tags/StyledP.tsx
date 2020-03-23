import styled from 'styled-components'
import { makeMargin } from '../../helper/csshelper'

export interface StyledPProps {
  full?: boolean
  slim?: boolean
  halfslim?: boolean
}

export const StyledP = styled.p<StyledPProps>`
  ${makeMargin}
  margin-top: 0;
  margin-bottom: ${props => (props.slim ? '0' : '30px')};
  ${props => (props.halfslim ? 'margin-bottom: 12px;' : '')}
  hyphens: auto;
  line-height: 1.45;
  font-size: 1.05rem;
`
