import styled from 'styled-components'
import { makePadding } from '../../helper/csshelper'

const SpoilerBody = styled.div`
  padding-top: 24px;
  padding-bottom: 14px;
  border-left: 4px solid ${props => props.theme.colors.brand};
`

export default SpoilerBody
