import styled from 'styled-components'
import { faPencilAlt, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import ShareModal from './sharemodal'
import { useScrollYPosition } from 'react-use-scroll-position'

export default function Toolbox() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <BoxWrapper>
        <IconButton>
          <FontAwesomeIcon icon={faPencilAlt} size="1x" /> Inhalte bearbeiten
        </IconButton>
        <IconButton onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faShareAlt} size="1x" /> Teilen!
        </IconButton>
      </BoxWrapper>
      {<ShareModal open={open} onClose={() => setOpen(false)} />}
    </>
  )
}

const BoxWrapper = styled.div`
  position: fixed;
  right: 32px;
  bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const IconButton = styled.button`
  color: ${props => props.theme.colors.brandGreen};
  font-weight: bold;
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
