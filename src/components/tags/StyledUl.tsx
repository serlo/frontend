import styled from 'styled-components'
import { makeMargin } from '../../helper/csshelper'

export const StyledUl = styled.ul`
  ${makeMargin}
  margin-bottom: ${props => props.theme.spacing.mb.block};
  margin-top: ${props => props.theme.spacing.mb.block};
  padding-left: 20px;
  list-style-type: none;

  /* hack, there should not be <p>s inside <li>s */
  > li > p { display: inline-block; }

  > li {
      margin-bottom: 7px;
      &:before {
        position: absolute;
        background-color: ${props => props.theme.colors.lighterblue};
        width: 10px;
        height: 10px;
        content: ' ' !important;
        border-radius: 2em;
        margin-left: -19px;
        margin-top: 7px;
      }
      // &:hover:before {
      //  background-color: ${props => props.theme.colors.brand};
      //  transform: scale(1.2);
      //} 
    }
        
    `
