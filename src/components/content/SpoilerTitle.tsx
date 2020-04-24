import styled from 'styled-components'
import { darken } from 'polished'

// interface SpoilerTitleProps {
//   open: boolean
// }

export default function SpoilerTitle({ open, children, onClick }) {
  return (
    <StyledSpoilerTitle onClick={onClick} open={open} role="button">
      {children}
    </StyledSpoilerTitle>
  )
}

const StyledSpoilerTitle = styled.a<{ open: boolean }>`
  margin: 0;
  padding: 0;
  font-size: 1.125rem;
  line-height: 1.3;
  padding: 10px 15px;
  cursor: pointer;
  text-align: left;
  color: ${props => (props.open ? '#fff' : props.theme.colors.dark1)};
  background-color: ${props =>
    props.open ? props.theme.colors.brand : props.theme.colors.bluewhite};

  &:hover {
    background-color: ${props =>
      props.open
        ? props.theme.colors.brand
        : props.theme.colors.lightBlueBackground};
  }
`
