import styled from 'styled-components'

import { makeMargin } from '../../helper/css'

export const GeogebraWrapper = styled.div`
  ${makeMargin}
  margin-bottom: ${(props) => props.theme.spacing.mb.block};
`
