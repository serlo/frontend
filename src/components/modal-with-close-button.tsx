import { faXmark } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useState, type ReactNode } from 'react'
import BaseModal from 'react-modal'

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
      shouldReturnFocusAfterClose={false}
      className={clsx(
        ModalClsx,
        'relative top-[40%] w-[500px] pb-10',
        className
      )}
    >
      {alignTitleAndCloseButton ? (
        <div className="flex items-center justify-between py-4">
          {title && (
            <h2 className="serlo-h2 my-0 flex-grow border-none py-0 text-center text-sm font-normal">
              {title}
            </h2>
          )}
          <button
            onClick={() =>
              confirmCloseDescription
                ? setShowConfirmation(true)
                : onCloseClick()
            }
            title={strings.share.close}
            className={tw`
              inline-block h-9 w-9
              cursor-pointer rounded-full border-none bg-transparent text-center
              leading-tight text-almost-black hover:bg-brand hover:text-white
            `}
            data-qa="modal-close-button"
          >
            <FaIcon icon={faXmark} className="h-5" />
          </button>
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
          <div className="rounded bg-white p-4 shadow-lg">
            <p>{confirmCloseDescription}</p>
            <div className="mt-4 flex">
              <button
                className="rounded bg-blue-500 px-3 py-1 text-white"
                onClick={() => setShowConfirmation(false)}
              >
                Stay
              </button>
              <button
                className="mr-2 rounded bg-red-500 px-3 py-1 text-white"
                onClick={onCloseClick}
              >
                Close
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
