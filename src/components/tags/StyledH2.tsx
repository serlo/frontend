import styled from 'styled-components'
import { transparentize } from 'polished'
import { makeMargin } from '../../helper/csshelper'

export const StyledH2 = styled.h2`
  ${makeMargin}
  margin-top: 0;
  padding-bottom: 6px;
  margin-bottom: 10px;
  font-size: 2rem;
  hyphens: auto;
  line-height: 1.22;
  font-weight: normal;
`
