import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { lighten } from 'polished'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'

interface MobileMenuButtonProps {
  open: boolean
  onClick: () => void
}

export default function MobileMenuButton(props: MobileMenuButtonProps) {
  const { open, onClick } = props
  return (
    <MenuButton onClick={onClick} aria-label="Menu">
      <FontAwesomeIcon icon={open ? faTimes : faBars} size="2x" />
    </MenuButton>
  )
}

const MenuButton = styled.button`
  border: 0;
  position: absolute;
  top: 16px;
  right: 16px;
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }

  background-color: ${props => lighten(0.18, props.theme.colors.lighterblue)};
  border-radius: 80px;
  width: 48px;
  height: 48px;
  padding: 0;
  color: ${props => props.theme.colors.brand};

  outline: none;
  border: 0;
  box-shadow: none;
  cursor: pointer;
`
