import { faXmark } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useState, type ReactNode } from 'react'
import BaseModal from 'react-modal'

import { CloseButton } from './close-button'
import { FaIcon } from './fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { tw } from '@/helper/tw'

try {
  BaseModal.defaultStyles.overlay!.zIndex = 101
} catch (e) {
  // eslint-disable-next-line no-console
  console.error(e)
}

BaseModal.setAppElement('#__next')

interface ModalWithCloseButtonProps {
  isOpen: boolean
  title?: string
  onCloseClick: () => void
  children: ReactNode
  className?: string
  alignTitleAndCloseButton?: boolean
  confirmCloseDescription?: string | undefined
}

export function ModalWithCloseButton({
  isOpen,
  title,
  onCloseClick,
  children,
  className,
  alignTitleAndCloseButton,
  confirmCloseDescription,
}: ModalWithCloseButtonProps) {
  const { strings } = useInstanceData()
  const [showConfirmation, setShowConfirmation] = useState(false)

  return (
    <BaseModal
      isOpen={isOpen}
      onRequestClose={onCloseClick}
      className={clsx(ModalClsx, 'top-[40%] w-[500px] pb-10', className)}
    >
      {alignTitleAndCloseButton ? (
        <div className="flex items-center justify-between py-4">
          {title && (
            <h2 className="serlo-h2 my-0 flex-grow border-none py-0 text-center text-sm font-normal">
              {title}
            </h2>
          )}
          <CloseButton
            onClick={() =>
              confirmCloseDescription
                ? setShowConfirmation(true)
                : onCloseClick()
            }
            title={strings.share.close}
            dataQa="modal-close-button"
          />
        </div>
      ) : (
        <>
          {title && <h2 className="serlo-h2">{title}</h2>}
          <button
            onClick={onCloseClick}
            title={strings.share.close}
            className={tw`
              absolute right-3.5 top-3.5 inline-block h-9 w-9
              cursor-pointer rounded-full border-none bg-transparent text-center
              leading-tight text-almost-black hover:bg-brand hover:text-white
            `}
            data-qa="modal-close-button"
          >
            <FaIcon icon={faXmark} className="h-5" />
          </button>
        </>
      )}
      {children}

      {showConfirmation && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="rounded bg-editor-primary-400 p-6 shadow-lg ">
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

export const ModalClsx = tw`
  absolute left-1/2 -mr-[50%] max-w-[85%] -translate-x-1/2
  -translate-y-1/2 rounded-xl border-none bg-white
  px-2.5  pt-2.5 shadow-modal outline-none
`
