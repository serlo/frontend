import React from 'react'
import styled from 'styled-components'
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Spoiler(props) {
  const { defaultOpen, title, children } = props
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <StyledSpoiler>
      <SpoilerHeader open={open} onClick={() => setOpen(!open)} title={title} />
      {open && <SpoilerContent>{children}</SpoilerContent>}
    </StyledSpoiler>
  )
}

export function SpoilerHeader(props) {
  const { open, onClick, title, children } = props
  return (
    <SpoilerTitle onClick={onClick}>
      {open ? (
        <FontAwesomeIcon icon={faCaretDown} />
      ) : (
        <FontAwesomeIcon icon={faCaretRight} />
      )}{' '}
      {title}
      {children}
    </SpoilerTitle>
  )
}

export const StyledSpoiler = styled.div<{ hide?: boolean }>`
  width: 100%
  display: flex;
  flex-direction: column;
  border-left: 4px solid ${props => props.theme.colors.gray};
  margin-bottom: 38px;
  > :not(:first-child) {
    display: ${props => (props.hide ? 'none' : 'block')};
  }
`

export const SpoilerTitle = styled.button`
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  margin-left: 15px;
  margin-right: 15px;
  font-size: 18px;
  padding: 2px;
  cursor: pointer;
  color: black;
  text-align: left;
`

export const SpoilerContent = styled.div`
  margin-top: 15px;
  margin-left: 10px;
  margin-right: 0;
`

export default Spoiler
