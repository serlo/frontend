import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, KeyboardEvent } from 'react'
import styled, { css } from 'styled-components'

import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { inputFontReset, makeLightButton, makeMargin } from '@/helper/css'
import { RevisionMutationMode, useRevisionMutation } from '@/helper/mutations'

export interface CheckoutRejectButtonsProps {
  revisionId: number
  repositoryId: number
  isRejected: boolean
  isCurrent: boolean
  buttonStyle?: string
}

export function CheckoutRejectButtons({
  revisionId,
  repositoryId,
  isRejected,
  isCurrent,
  buttonStyle,
}: CheckoutRejectButtonsProps) {
  const loggedInData = useLoggedInData()
  const [modalMode, setModalMode] = useState<RevisionMutationMode | null>(null)
  const revisionMutation = useRevisionMutation()
  const [reason, setReason] = useState('')
  if (!loggedInData) return null
  if (isCurrent) return null
  const { strings } = loggedInData

  const confirmActive = reason.length > 0

  function onCloseClick() {
    setModalMode(null)
  }

  function onConfirm() {
    if (modalMode && confirmActive) {
      void revisionMutation(modalMode, repositoryId, {
        revisionId,
        reason,
      })
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.code === 'Enter' && e.metaKey) onConfirm()
  }

  return (
    <>
      <CheckoutButton
        className={buttonStyle}
        onClick={() => setModalMode('checkout')}
        onPointerUp={(e) => e.currentTarget.blur()}
      >
        <FontAwesomeIcon icon={faCheck} className="lg:mr-0.5" />{' '}
        {strings.revisions.checkout.action}
      </CheckoutButton>
      {!isRejected && (
        <RejectButton
          className={buttonStyle}
          onClick={() => setModalMode('reject')}
          onPointerUp={(e) => e.currentTarget.blur()}
        >
          &nbsp;
          <FontAwesomeIcon
            icon={faTimes}
            size="1x"
            className="lg:mr-0.5"
          />{' '}
          {strings.revisions.reject.action}
        </RejectButton>
      )}

      <ModalWithCloseButton
        isOpen={modalMode != null}
        onCloseClick={onCloseClick}
        title={
          modalMode != null ? strings.revisions[modalMode].title : undefined
        }
      >
        {renderModalContent()}
      </ModalWithCloseButton>
    </>
  )

  function renderModalContent() {
    if (!modalMode) return null
    return (
      <>
        <Parapgraph>
          {strings.revisions[modalMode].explanation}
          <Textarea
            value={reason}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              setReason(event.target.value)
            }}
            onKeyDown={onKeyDown}
          />
          <ConfirmButton disabled={!confirmActive} onClick={onConfirm}>
            {strings.revisions.confirm}
          </ConfirmButton>
        </Parapgraph>
      </>
    )
  }
}

const CheckoutButton = styled.button`
  /* ${makeLightButton}
  &:hover {
    background-color: ${(props) => props.theme.colors.brandGreen};
  }
  margin-right: 15px; */
`

const RejectButton = styled.button`
  /* ${makeLightButton}
  &:hover {
    background-color: #c56c6c;
  } */
`

const Parapgraph = styled.p`
  ${makeMargin}
  margin-bottom: 5px;
`

const ConfirmButton = styled.button`
  ${makeLightButton}
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.2;
      cursor: not-allowed;
    `}
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
