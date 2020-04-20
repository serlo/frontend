import styled from 'styled-components'
import { makePadding } from '../../helper/csshelper'

const ImgCentered = styled.div`
  ${makePadding}
  margin-bottom: ${props => props.theme.spacing.mb.block};
  display: flex;
  justify-content: center;
`

export default ImgCentered
