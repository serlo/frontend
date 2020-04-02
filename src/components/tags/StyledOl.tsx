import styled from 'styled-components'
import { makeMargin } from '../../helper/csshelper'

export const StyledOl = styled.ol`

  ${makeMargin}
  margin-bottom: ${props => props.theme.spacing.mb.block};
  padding-left: 25px;
  list-style-type: none;
  counter-reset: list-counter;

  > li {
            
    &:before {
      position: absolute;
      content: counter(list-counter);
      counter-increment: list-counter;
      color: ${props => props.theme.colors.brand};
      font-weight: bold;
      vertical-align: top;
      display: inline-block;
      border-radius: 2em;
      margin-left: -24px;
      margin-top: 4px;
      background-color: ${props => props.theme.colors.lightBlueBackground};
      width: 17px;
      height: 17px;
      font-size: 0.7em;
      text-align: center;
      line-height: 1.6em;
    }
  }
`
