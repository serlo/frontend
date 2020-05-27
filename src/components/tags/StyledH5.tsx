import styled from 'styled-components'
import { makeMargin } from '../../helper/csshelper'

const StyledH5 = styled.h5`
  ${makeMargin}
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.mb.h5};
  font-size: 1.0625rem;
  line-height: 1.22;
`

export default StyledH5
