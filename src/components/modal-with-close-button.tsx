import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import BaseModal from 'react-modal'
import styled from 'styled-components'

import { useInstanceData } from '@/contexts/instance-context'

try {
  BaseModal.defaultStyles.overlay!.zIndex = 101
} catch (e) {
  console.log(e)
  //
}

BaseModal.setAppElement('#__next')

export function ModalWithCloseButton({
  isOpen,
  title,
  onCloseClick,
  children,
}: {
  isOpen: boolean
  title?: string
  onCloseClick: () => void
  children: React.ReactNode
}) {
  const { strings } = useInstanceData()

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseClick}
      shouldReturnFocusAfterClose={false}
    >
      {title && <h2 className="serlo-h2">{title}</h2>}
      {children}
      <CloseButton onClick={onCloseClick} title={strings.share.close}>
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </CloseButton>
    </Modal>
  )
}

// this is overriding the styles of the modal-content only. see doc to change overlay etc.
export const Modal = styled(BaseModal)`
  position: absolute;
  top: 40%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 500px;
  border-radius: 12px;
  max-width: 85%;
  border: 0;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  padding: 10px 10px 30px 10px;
  background-color: #fff;
  outline: none;
`

export const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: inline-block;
  color: ${(props) => props.theme.colors.dark1};
  &:hover {
    background-color: ${(props) => props.theme.colors.brand};
    color: white;
  }
  width: 35px;
  height: 35px;
  border-radius: 30px;
  text-align: center;
`
