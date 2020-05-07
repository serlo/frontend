import styled, { css } from 'styled-components'
import { makeGreenButton } from '../../helper/csshelper'

const ToolLineButton = styled.a<{ top?: boolean }>`
  ${makeGreenButton}
  font-weight: bold;
  font-size: 0.9rem;
  margin: 2px;
  margin-left: 3px;
  color: white;
  background-color: ${props => props.theme.colors.brandGreen};
  padding-top: 3px;
  padding-bottom: 3px;

  &:hover {
    color: white;
    background-color: ${props => props.theme.colors.brandGreen};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    position: absolute;
    margin-left: 90px;
    margin-top: ${props => (props.top ? '-43px' : '-15px')};
  }
`

export default ToolLineButton
