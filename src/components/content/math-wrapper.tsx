import styled from 'styled-components'

import { makePadding } from '../../helper/css'

interface MathWrapperProps {
  centered?: boolean
  bigger?: boolean
}

export const MathWrapper = styled.div<MathWrapperProps>`
  ${makePadding}
  width:100%;
  box-sizing: border-box;
  /* text-align: ${(props) => (props.centered ? 'center' : 'left')}; */
  text-align: left;
  margin-bottom: ${(props) => props.theme.spacing.mb.block};
  font-size: 1.125rem;
  overflow-x: auto;
  overflow-y: hidden;
  ${(props) => (props.bigger ? 'line-height:2.5;' : '')}
`
