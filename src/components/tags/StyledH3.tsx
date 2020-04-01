import styled from 'styled-components'
import { makeMargin } from '../../helper/csshelper'
import { lighten } from 'polished'

export const StyledH3 = styled.h3`
  ${makeMargin}
  margin-top: 0;
  padding-top: 12px;
  margin-bottom: ${props => props.theme.spacing.mb.h3};
  font-size: 1.3125rem;
  font-weight: bold;
  line-height: 1.22;
`
