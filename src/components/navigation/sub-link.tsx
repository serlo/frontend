import styled from 'styled-components'

import { Link } from '../content/link'

export const SubLink = styled(Link)`
  padding-top: 3px;
  padding-bottom: 3px;
  display: block;
  hyphens: auto;
  &:hover span {
    color: #fff;
    background-color: ${(props) => props.theme.colors.brand};
  }
`
