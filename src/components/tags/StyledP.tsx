import styled from 'styled-components'
import { makeMargin } from '../../helper/csshelper'

export interface StyledPProps {
  mb?: string
  full?: boolean
}

export const StyledP = styled.p<StyledPProps>`
  ${makeMargin}
  margin-top: 0;
  margin-bottom: ${props =>
    props.mb == 'none' ? '0' : props.theme.spacing.mb[props.mb || 'block']};
  hyphens: auto;
  line-height: 1.3;
  font-size: 1.125rem;
`
