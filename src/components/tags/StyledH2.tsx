import styled from 'styled-components'
import { transparentize, darken, lighten } from 'polished'
import { makeMargin } from '../../helper/csshelper'

export const StyledH2 = styled.h2`
  ${makeMargin}
  margin-top: 0;
  border-bottom: 1px solid
    ${props => transparentize(0.7, props.theme.colors.dark1)};
  padding-bottom: 6px;
  padding-top: 24px;
  margin-bottom: ${props => props.theme.spacing.mb.h2};
  font-size: 1.65rem;
  font-weight: bold;
  hyphens: auto;
  line-height: 1.22;
  color: ${props => props.theme.colors.h2};
`
