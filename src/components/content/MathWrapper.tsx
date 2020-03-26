import styled from 'styled-components'
import { makePadding } from '../../helper/csshelper'

export interface MathWrapperProps {
  full?: boolean
  centered?: boolean
  slim?: boolean
  fullslim?: boolean
}

export const MathWrapper = styled.div<MathWrapperProps>`
  ${makePadding}
  width:100%;
  box-sizing: border-box;
  text-align: ${props => (props.centered ? 'center' : 'left')};
  margin-bottom: ${props => (props.slim ? '12px' : '38px')};
  ${props => (props.fullslim ? 'margin-bottom: 0px;' : '')}
  font-size: 1.3125rem;
  padding: 10px 0;
  overflow: auto;
  ${props => (props.centered ? '' : 'padding-left:15px;padding-right:15px;')}
`
