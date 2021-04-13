import styled from 'styled-components'

import { makePadding } from '../../helper/css'

export const ImgCentered = styled.div`
  ${makePadding}
  margin-bottom: ${(props) => props.theme.spacing.mb.block};
  text-align: center;
  img {
    display: inline;
  }
`
