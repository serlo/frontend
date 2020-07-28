import styled from 'styled-components'

import { makeMargin } from '../../helper/css'
import { FrontendContentNode } from '@/data-types'

export interface SpoilerContainerProps {
  children: FrontendContentNode[]
}

export const SpoilerContainer = styled.div<{ hide?: boolean }>`
  @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
    ${makeMargin}
  }
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-bottom: ${(props) => props.theme.spacing.mb.block};
`
