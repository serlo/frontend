import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

interface MobileMenuButtonProps {
  open: boolean
  onClick: () => void
}

export function MobileMenuButtonNew(props: MobileMenuButtonProps) {
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
  top: 29px;
  right: 16px;
  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    display: none;
  }

  border: 1px solid rgb(64, 64, 64);
  border-radius: 80px;
  width: 48px;
  height: 48px;
  padding: 0;
  color: rgb(64, 64, 64);

  outline: none;
  box-shadow: none;
  cursor: pointer;
`
