import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { useState, KeyboardEvent, ChangeEvent } from 'react'

import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import {
  RevisionMutationMode,
  useRevisionDecideMutation,
} from '@/helper/mutations/revision'

export interface CheckoutRejectButtonsProps {
  revisionId: number
  isRejected: boolean
  isCurrent: boolean
  isPage: boolean
  buttonStyle?: string
}

export function CheckoutRejectButtons({
  revisionId,
  isRejected,
  isCurrent,
  isPage,
  buttonStyle,
}: CheckoutRejectButtonsProps) {
  const loggedInData = useLoggedInData()
  const [modalMode, setModalMode] = useState<RevisionMutationMode | null>(null)
  const revisionMutation = useRevisionDecideMutation()
  const [reason, setReason] = useState('')
  if (!loggedInData) return null
  if (isCurrent) return null
  const { strings } = loggedInData

  function onCloseClick() {
    setModalMode(null)
  }

  function onConfirm() {
    if (modalMode) {
      void revisionMutation(modalMode, { revisionId, reason }, isPage)
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.code === 'Enter' && e.metaKey) onConfirm()
  }

  return (
    <>
      <button
        className={buttonStyle}
        onClick={() => setModalMode('checkout')}
        onPointerUp={(e) => e.currentTarget.blur()}
      >
        <FaIcon icon={faCheck} className="lg:mr-0.5" />{' '}
        {strings.revisions.checkout.action}
      </button>
      {!isRejected && !isPage && (
        <button
          className={buttonStyle}
          onClick={() => setModalMode('reject')}
          onPointerUp={(e) => e.currentTarget.blur()}
        >
          &nbsp;
          <FaIcon icon={faTimes} className="lg:mr-0.5" />{' '}
          {strings.revisions.reject.action}
        </button>
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
        <p className="mx-side mb-1">
          {strings.revisions[modalMode].explanation}
          {renderTextArea()}
          <button
            className="serlo-button serlo-make-interactive-light"
            onClick={onConfirm}
          >
            {strings.revisions.confirm}
          </button>
        </p>
      </>
    )
  }

  function renderTextArea() {
    return (
      <>
        <style jsx>{`
          textarea {
            font-weight: bold;

            width: 100%;
            border: none;
            padding: 0.5rem 3.5rem 0.5rem 1rem;
            box-sizing: border-box;
            outline: none;
            min-height: 80px;

            margin: 20px 0;
            border-radius: 10px;
            @apply bg-brand-50;

            ::placeholder {
              @apply text-brandgreen;
            }
          }
        `}</style>
        <textarea
          value={reason}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            setReason(event.target.value)
          }}
          onKeyDown={onKeyDown}
        />
      </>
    )
  }
}
