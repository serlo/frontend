import { useState, type ReactNode, useCallback } from 'react'
import BaseModal from 'react-modal'

import { CloseButton } from './close-button'
import { useInstanceData } from '@/contexts/instance-context'
import { cn } from '@/helper/cn'

BaseModal.setAppElement('#__next')

interface ModalWithCloseButtonProps {
  isOpen: boolean
  title?: string
  onCloseClick: () => void
  children: ReactNode
  className?: string
  alignTitleAndCloseButton?: boolean
  confirmCloseDescription?: string | undefined
  closeButtonClassName?: string
}

export function ModalWithCloseButton({
  isOpen,
  title,
  onCloseClick,
  children,
  className,
  alignTitleAndCloseButton,
  confirmCloseDescription,
  closeButtonClassName,
}: ModalWithCloseButtonProps) {
  const { strings } = useInstanceData()
  const [showConfirmation, setShowConfirmation] = useState(false)

  const onRequestClose = useCallback(
    () =>
      confirmCloseDescription ? setShowConfirmation(true) : onCloseClick(),
    [confirmCloseDescription, onCloseClick]
  )

  return (
    <BaseModal
      overlayClassName="z-[101]"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={cn('serlo-modal', className)}
    >
      {alignTitleAndCloseButton ? (
        <div className="flex w-full items-center justify-between py-4">
          {title && (
            <h2 className="serlo-h2 my-0 flex-grow border-none py-0 text-center text-sm font-normal">
              {title}
            </h2>
          )}
          <CloseButton
            onClick={onRequestClose}
            title={strings.share.close}
            dataQa="modal-close-button"
            className={closeButtonClassName}
          />
        </div>
      ) : (
        <>
          {title && <h2 className="serlo-h2">{title}</h2>}
          <CloseButton
            onClick={onRequestClose}
            title={strings.share.close}
            dataQa="modal-close-button"
            className={cn('absolute right-3.5 top-3.5', closeButtonClassName)}
          />
        </>
      )}
      {children}

      {showConfirmation && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="rounded bg-orange-200 p-6 shadow-lg ">
            <p className="px-4">{confirmCloseDescription}</p>
            <div className="mt-4 flex space-x-4">
              <button
                className="mr-4 rounded bg-transparent px-4 py-2 text-blue-500 hover:bg-white"
                onClick={onCloseClick}
              >
                {strings.modal.leaveNow}
              </button>
              <button
                className="serlo-button-blue rounded bg-blue-500 px-4 py-2 text-white"
                onClick={() => setShowConfirmation(false)}
              >
                {strings.modal.noStay}
              </button>
            </div>
          </div>
        </div>
      )}
    </BaseModal>
  )
}
