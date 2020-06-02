import styled from 'styled-components'
import { makeMargin } from '../../helper/csshelper'

const GeogebraWrapper = styled.div`
  ${makeMargin}
  margin-bottom: ${(props) => props.theme.spacing.mb.block};
`

export default GeogebraWrapper
