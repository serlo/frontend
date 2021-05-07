import styled from 'styled-components'

import { SubList } from '../navigation/sub-list'

export const HoverSubList = styled(SubList)`
  background-color: ${(props) => props.theme.colors.lightBackground};
  min-width: 180px;
`
