import styled from 'styled-components'
import { darken } from 'polished'

const SpoilerTitle = styled.div`
  margin: 0;
  padding: 0;
  font-size: 1.125rem;
  line-height: 1.3;
  padding: 10px 15px;
  cursor: pointer;
  text-align: left;
  color: ${props => props.theme.colors.dark1};
  background-color: ${props =>
    darken(0.04, props.theme.colors.lightBackground)};
`

export default SpoilerTitle
