import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState, KeyboardEvent, ChangeEvent } from 'react'

import { AuthorToolsData } from '../foldout-author-menus/author-tools'
import { UserToolsItem } from '../user-tools-item'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { UuidRevType } from '@/data-types'
import { cn } from '@/helper/cn'
import {
  RevisionMutationMode,
  useRevisionDecideMutation,
} from '@/mutations/use-revision-decide-mutation'

export interface CheckoutRejectButtonsProps {
  data: AuthorToolsData
  aboveContent?: boolean
}

export function CheckoutRejectButtons({
  data,
  aboveContent,
}: CheckoutRejectButtonsProps) {
  const [modalMode, setModalMode] = useState<RevisionMutationMode | null>(null)
  const revisionMutation = useRevisionDecideMutation()
  const [reason, setReason] = useState('')
  const loggedInData = useLoggedInData()

  if (!data.revisionData) return null
  const isCurrent = data.revisionData.current
  const isRejected = data.revisionData.rejected
  const revisionId = data.revisionId
  const isPage = data.typename === UuidRevType.Page

  if (isCurrent || !revisionId) return null

  if (!loggedInData) return null
  const { strings } = loggedInData

  function onCloseClick() {
    setModalMode(null)
  }

  function onConfirm() {
    if (modalMode) {
      void revisionMutation(modalMode, {
        revisionId: revisionId as number,
        reason,
      })
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
        isOpen={modalMode !== null}
        setIsOpen={(open) => (open ? void null : onCloseClick())}
        title={
          modalMode !== null ? strings.revisions[modalMode].title : undefined
        }
      >
        {renderModalContent()}
      </ModalWithCloseButton>
    </>
  )

  function renderButton(mode: 'reject' | 'checkout') {
    const isCheckout = mode === 'checkout'
    return (
      <UserToolsItem
        title={strings.revisions[mode].action}
        onClick={() => setModalMode(mode)}
        aboveContent={aboveContent}
        icon={isCheckout ? faCheck : faXmark}
      />
    )
    // return (
    //   <button className="buttonStyle" onClick={() => setModalMode(mode)}>
    //     &nbsp;
    //     <FaIcon
    //       icon={isCheckout ? faCheck : faXmark}
    //       className="lg:mr-0.5"
    //     />{' '}
    //     {strings.revisions[mode].action}
    //   </button>
    // )
  }

  function renderModalContent() {
    if (!modalMode) return null
    return (
      <>
        <p className="mx-side mb-1">
          {strings.revisions[modalMode].explanation}
          {renderTextArea()}
          <button className="serlo-button-light" onClick={onConfirm}>
            {strings.revisions.confirm}
          </button>
        </p>
      </>
    )
  }

  function renderTextArea() {
    return (
      <>
        <textarea
          value={reason}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            setReason(event.target.value)
          }}
          onKeyDown={onKeyDown}
          className={cn(`
            bold my-5 box-border min-h-[80px] w-full
            rounded-xl border-0 bg-brand-50 py-2 pl-4 pr-14
            outline-none focus-visible:bg-brand-200
          `)}
        />
      </>
    )
  }
}
