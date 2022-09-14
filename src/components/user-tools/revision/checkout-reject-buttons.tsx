import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { useState, KeyboardEvent, ChangeEvent } from 'react'

import { AuthorToolsData } from '../more-autor-tools/author-tools-hover-menu'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
// import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { UuidRevType } from '@/data-types'
import {
  RevisionMutationMode,
  useRevisionDecideMutation,
} from '@/mutations/use-revision-decide-mutation'

export interface CheckoutRejectButtonsProps {
  data: AuthorToolsData
  // revisionId: number
  // isRejected: boolean
  // isCurrent: boolean
  // isPage: boolean
  // buttonStyle?: string
}

export function CheckoutRejectButtons({ data }: CheckoutRejectButtonsProps) {
  // const loggedInData = useLoggedInData()
  const [modalMode, setModalMode] = useState<RevisionMutationMode | null>(null)
  const revisionMutation = useRevisionDecideMutation()
  const [reason, setReason] = useState('')

  if (!data.revisionData) return null
  const isCurrent = data.revisionData.current
  const isRejected = data.revisionData.rejected
  const revisionId = data.revisionId
  const isPage = data.type === UuidRevType.Page

  if (isCurrent || !revisionId) return null
  // const { strings } = loggedInData

  function onCloseClick() {
    setModalMode(null)
  }

  function onConfirm() {
    if (modalMode) {
      void revisionMutation(
        modalMode,
        { revisionId: revisionId as number, reason },
        isPage
      )
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.code === 'Enter' && e.metaKey) onConfirm()
  }

  return (
    <>
      {renderButton('checkout')}
      {!isRejected && !isPage ? renderButton('reject') : null}

      <ModalWithCloseButton
        isOpen={modalMode != null}
        onCloseClick={onCloseClick}
        title={
          '123'
          // modalMode != null ? strings.revisions[modalMode].title : undefined
        }
      >
        {renderModalContent()}
      </ModalWithCloseButton>
    </>
  )

  function renderButton(mode: 'reject' | 'checkout') {
    const isCheckout = mode === 'checkout'
    return (
      <button className="buttonStyle" onClick={() => setModalMode(mode)}>
        &nbsp;
        <FaIcon
          icon={isCheckout ? faCheck : faTimes}
          className="lg:mr-0.5"
        />{' '}
        {/* {strings.revisions[mode].action} */} 123
      </button>
    )
  }

  function renderModalContent() {
    if (!modalMode) return null
    return (
      <>
        <p className="mx-side mb-1">
          {/* {strings.revisions[modalMode].explanation} */}
          {renderTextArea()}
          <button className="serlo-button-light" onClick={onConfirm}>
            {/* {strings.revisions.confirm} */}
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
