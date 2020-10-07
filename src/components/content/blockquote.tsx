import styled from 'styled-components'

import { makeMargin } from '../../helper/css'

export const Blockquote = styled.blockquote`
  border-left: 6px solid ${(props) => props.theme.colors.lightBlueBackground};
  padding: 10px;
  margin-top: ${(props) => props.theme.spacing.mb.block};
  margin-bottom: ${(props) => props.theme.spacing.mb.block};
  ${makeMargin}

  > p {
    margin-bottom: 0;
  }
`
