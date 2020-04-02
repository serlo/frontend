import styled from 'styled-components'
import { makeMargin } from '../../helper/csshelper'

export const StyledUl = styled.ul`
  ${makeMargin}
  margin-bottom: ${props => props.theme.spacing.mb.block};
  margin-top: 0;
  padding-left: 20px;
  list-style-type: none;

  > li {
      &:before {
        position: absolute;
        background-color: ${props => props.theme.colors.lighterblue};
        width: 10px;
        height: 10px;
        content: ' ';
        border-radius: 2em;
        margin-left: -19px;
        margin-top: 7px;
      }
    }        
`
