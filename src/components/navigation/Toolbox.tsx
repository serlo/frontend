import React from 'react'
import styled from 'styled-components'
import { faPencilAlt, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ShareModal from './ShareModal'
import { HSpace } from '../content/HSpace'

export default function Toolbox({ onEdit = () => {} }) {
  const [open, setOpen] = React.useState(false)

  return (
    <AbsoluteWrapper>
      <BoxWrapper>
        <IconButton onClick={onEdit}>
          <FontAwesomeIcon icon={faPencilAlt} size="1x" /> Inhalte bearbeiten
        </IconButton>
        <IconButton onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faShareAlt} size="1x" /> Teilen!
        </IconButton>
      </BoxWrapper>
      <ShareModal open={open} onClose={() => setOpen(false)} />
    </AbsoluteWrapper>
  )
}

const AbsoluteWrapper = styled.div`
  position: absolute;
  right: 32px;
  bottom: 32px;
  height: 100%;
  display: flex;
  align-items: flex-end;
`

const BoxWrapper = styled.div`
  position: sticky;
  bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
  }
`

const IconButton = styled.button`
  color: ${props => props.theme.colors.brandGreen};
  font-weight: bold;
  font-family: inherit;
  border: none;
  background-color: transparent;
  padding: 6px 6px;
  margin: 4px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    color: white;
    background-color: ${props => props.theme.colors.brandGreen};
  }
`
