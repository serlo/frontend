import React from 'react'
import styled from 'styled-components'
import { faPencilAlt, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ShareModal from './sharemodal'

export default function Toolbox() {
  const [open, setOpen] = React.useState(false)
  const [visible, setVisible] = React.useState(true)

  React.useEffect(() => {
    function handleScroll() {
      const scrollY = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight
      const spaceToBottom = Math.max(0, docHeight - scrollY)
      const shouldVisible = spaceToBottom > 1800
      setVisible(shouldVisible)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  console.log('rerender')

  if (!visible) return null

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
