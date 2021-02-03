import styled from 'styled-components'

import { makePadding } from '../../helper/css'

interface MathWrapperProps {
  nowrap?: boolean
}

export const MathWrapper = styled.div<MathWrapperProps>`
  ${makePadding}
  width:100%;
  box-sizing: border-box;
  text-align: left;
  margin-bottom: ${(props) => props.theme.spacing.mb.block};
  font-size: 1.125rem;
  overflow-x: auto;
  overflow-y: hidden;
  padding-top: 2px;
  padding-bottom: 2px;
  ${(props) => (props.nowrap ? 'white-space: nowrap;' : '')}
`
