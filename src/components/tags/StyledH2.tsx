import styled from 'styled-components'
import { transparentize } from 'polished'
import { makeMargin } from '../../helper/csshelper'

export const StyledH2 = styled.h2`
  ${makeMargin}
  margin-top: 0;
  border-bottom: 1px solid
    ${props => transparentize(0.7, props.theme.colors.dark1)};
  padding-bottom: 6px;
  margin-bottom: 38px;
  font-size: 1.5rem;
  font-weight: bold;
  hyphens: auto;
  line-height: 1.22;
`
