import styled from 'styled-components'

import { FrontendContentNode } from '@/data-types'

export interface SpoilerBodyProps {
  children: FrontendContentNode[]
}

export const SpoilerBody = styled.div`
  padding-top: 24px;
  padding-bottom: 14px;
  border-left: 8px solid ${(props) => props.theme.colors.brand};
`
