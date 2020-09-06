import styled from 'styled-components'

import { Link } from './link'

export function ImageLink(props: any) {
  return <StyledLink {...props} noExternalIcon />
}

const StyledLink = styled(Link)`
  width: 100%;
  display: block;
`
