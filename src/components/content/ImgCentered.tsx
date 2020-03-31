import styled from 'styled-components'
import { makePadding } from '../../helper/csshelper'

export const ImgCentered = styled.div<{ mb?: string; full?: boolean }>`
  ${makePadding}
  margin-bottom: ${props =>
    props.mb === 'none' ? '0' : props.theme.spacing.mb[props.mb || 'block']};
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
`
