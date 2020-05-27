import styled from 'styled-components'
import { makeMargin } from '../../helper/csshelper'

const SpoilerContainer = styled.div<{ hide?: boolean }>`
  @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
    ${makeMargin}
  }
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-bottom: ${(props) => props.theme.spacing.mb.block};
`

export default SpoilerContainer
