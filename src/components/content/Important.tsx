import styled from 'styled-components'
import { makeMargin } from '../../helper/csshelper'

export const Important = styled.div`
  border-right: 2px solid ${props => props.theme.colors.orange};
  padding: 10px;
  margin-bottom: ${props => props.theme.spacing.mb.block};
  ${makeMargin}
`
