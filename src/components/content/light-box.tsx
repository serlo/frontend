import React from 'react'
import styled from 'styled-components'

import { Modal } from '../modal'
import { makeMargin } from '@/helper/css'

export interface LightBoxProps {
  open: boolean
  onClose: () => void
  src: string
  label?: string
}

export function LightBox(props: LightBoxProps) {
  const { open, onClose, label, src } = props
  if (!open) return null

  return (
    <StyledModal isOpen={open} onRequestClose={onClose}>
      <_StyledImg onClick={onClose} src={src} alt={label || 'Bild'} />
      <p>{label}</p>

      {/* <CloseButton onClick={onClose} title="Close">
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </CloseButton> */}
    </StyledModal>
  )
}

//this is overriding the styles of the modal-content only. see doc to change overlay etc.
export const StyledModal = styled(Modal)`
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  max-width: 85%;
  border: 0;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  padding: 10px 10px 10px 10px;
  background-color: #fff;
  outline: none;

  pointer-events: none;
  > p {
    pointer-events: auto;
  }
`

const _StyledImg = styled.img`
  padding: 50px ${makeMargin};
  margin: 0 auto;
  max-width: 100%;
  height: auto;
  max-height: 86vh;
  cursor: zoom-out;
`

// const CloseButton = styled.button`
//   position: absolute;
//   top: 14px;
//   right: 14px;
//   background-color: rgba(255, 255, 255, 0.6);
//   border: none;
//   cursor: pointer;
//   display: inline-block;
//   color: ${props => props.theme.colors.dark1};
//   &:hover {
//     background-color: ${props => props.theme.colors.brand};
//     color: white;
//   }
//   width: 35px;
//   height: 35px;
//   border-radius: 30px;
//   text-align: center;
// `
