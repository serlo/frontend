import styled from 'styled-components'
import { makePadding } from '../../helper/csshelper'

export interface MathWrapperProps {
  full?: boolean
  centered?: boolean
  slim?: boolean
}

export const MathWrapper = styled.div<MathWrapperProps>`
  ${makePadding}
  width:100%;
  box-sizing: border-box;
  text-align: ${props => (props.centered ? 'center' : 'left')};
  margin-bottom: ${props => (props.slim ? '12px' : '38px')};
  font-size: 1.3125rem;
  padding: 10px 0;
  overflow: auto;
  ${props => (props.centered ? '' : 'padding-left:15px;padding-right:15px;')}
`
