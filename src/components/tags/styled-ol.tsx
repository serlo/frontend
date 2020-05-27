import styled from 'styled-components'

import { makeMargin } from '../../helper/css'

export const StyledOl = styled.ol`
  ${makeMargin}
  margin-bottom: ${(props) => props.theme.spacing.mb.block};
  margin-top: 0;
  padding-left: 29px;
  list-style-type: none;
  counter-reset: list-counter;

  > li {
            
    &:before {
      position: absolute;
      content: counter(list-counter);
      counter-increment: list-counter;
      color: ${(props) => props.theme.colors.brand};
      font-weight: bold;
      vertical-align: top;
      display: inline-block;
      border-radius: 2em;
      margin-left: -28px;
      margin-top: 2px;
      background-color: ${(props) => props.theme.colors.lightBlueBackground};
      width: 17px;
      height: 17px;
      font-size: 0.7em;
      text-align: center;
      line-height: 1.6em;
    }

    > ul, > ol {
      margin-top: 8px;
      margin-bottom: 16px !important;
    }
  }
`
