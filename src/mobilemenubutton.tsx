import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { lighten } from 'polished'

export default function MobileMenuButton(props) {
  const { open, onClick } = props
  return (
    <MenuButton onClick={onClick}>
      <FontAwesomeIcon icon={open ? 'times' : 'bars'} size="2x" />
    </MenuButton>
  )
}

const MenuButton = styled.button`
  border: 0;
  position absolute;
  top: 1rem;
  right: 1rem;
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
      display: none;
  }

  background-color: ${props => lighten(0.18, props.theme.colors.lighterblue)};
  border-radius: 5rem;
  width: 3rem;
  height: 3rem;
  padding: 0;
  color: ${props => props.theme.colors.brand};

  outline: none;
  border: 0;
  box-shadow: none;
`
