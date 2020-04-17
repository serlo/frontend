import styled from 'styled-components'
import { makeGreenButton } from '../../helper/csshelper'

const ToolLineButton = styled.a`
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
`

export default ToolLineButton
