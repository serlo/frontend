import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import styled from 'styled-components'

import { StyledH2 } from '@/components/tags/styled-h2'
import { StyledModal, CloseButton } from '@/components/user-tools/share-modal'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { inputFontReset, makeLightButton, makeMargin } from '@/helper/css'
import { showToastNotice } from '@/helper/show-toast-notice'

export interface CheckoutRejectButtonsProps {
  onAccept?: () => void
  onReject?: () => void
}

export function CheckoutRejectButtons() {
  const loggedInData = useLoggedInData()
  const instanceData = useInstanceData()
  const instanceStrings = instanceData.strings
  const [modalMode, setModalMode] = useState<'accept' | 'reject' | null>(null)
  if (!loggedInData) return null
  const { strings } = loggedInData

  function onCloseClick() {
    setModalMode(null)
  }

  function onConfirmClick() {
    showToastNotice('Sorry, not yet working in new frontend. 🙃 ')
    // if (modalMode == 'accept') {
    // }
  }

  return (
    <div>
      <CheckoutButton
        onClick={() => setModalMode('accept')}
        onPointerUp={(e) => e.currentTarget.blur()}
      >
        <FontAwesomeIcon icon={faCheck} /> {strings.revisions.accept.action}
      </CheckoutButton>
      <RejectButton
        onClick={() => setModalMode('reject')}
        onPointerUp={(e) => e.currentTarget.blur()}
      >
        <FontAwesomeIcon icon={faTimes} /> {strings.revisions.reject.action}
      </RejectButton>

      <StyledModal isOpen={modalMode != null} onRequestClose={onCloseClick}>
        {renderModalContent()}
      </StyledModal>
    </div>
  )

  function renderModalContent() {
    if (!modalMode) return null
    return (
      <>
        <StyledH2>{strings.revisions[modalMode].title}</StyledH2>
        <Parapgraph>
          {strings.revisions[modalMode].explanation}
          <Textarea />
          <ConfirmButton onClick={onConfirmClick}>
            {strings.revisions.confirm}
          </ConfirmButton>
        </Parapgraph>
        <CloseButton onClick={onCloseClick} title={instanceStrings.share.close}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
      </>
    )
  }
}

const CheckoutButton = styled.button`
  ${makeLightButton}
  &:hover {
    background-color: ${(props) => props.theme.colors.brandGreen};
  }
  margin-right: 15px;
`

const RejectButton = styled.button`
  ${makeLightButton}
  &:hover {
    background-color: #c56c6c;
  }
`

const Parapgraph = styled.p`
  ${makeMargin}
  margin-bottom: 5px;
`

const ConfirmButton = styled.button`
  ${makeLightButton}
`

const Textarea = styled.textarea`
  ${inputFontReset}
  font-weight: bold;

  width: 100%;
  border: none;
  padding: 0.5rem 3.5rem 0.5rem 1rem;
  box-sizing: border-box;
  outline: none;
  min-height: 80px;

  margin: 20px 0;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.lightBackground};

  ::placeholder {
    color: ${(props) => props.theme.colors.brandGreen};
  }
`
