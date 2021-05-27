import BaseModal from 'react-modal'
import styled from 'styled-components'

try {
  BaseModal.defaultStyles.overlay!.zIndex = 101
} catch (e) {
  console.log(e)
  //
}

BaseModal.setAppElement('#__next')

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
