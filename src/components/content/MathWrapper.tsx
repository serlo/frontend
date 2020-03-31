import styled from 'styled-components'
import { makePadding } from '../../helper/csshelper'

export interface MathWrapperProps {
  full?: boolean
  centered?: boolean
  mb: string
  bigger?: boolean
}

export const MathWrapper = styled.div<MathWrapperProps>`
  ${makePadding}
  width:100%;
  box-sizing: border-box;
  text-align: ${props => (props.centered ? 'center' : 'left')};
  margin-bottom: ${props =>
    props.mb == 'none' ? '0' : props.theme.spacing.mb[props.mb || 'block']};
  font-size: 1.3125rem;
  padding-top: 10px;
  padding-bottom: 10px;
  overflow: auto;
  ${props => (props.bigger ? 'line-height:2.5;' : '')}
`
