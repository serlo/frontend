import {
  getFirstElementOrUndefined,
  useShadowRoot,
} from '@editor/core/helpers/use-shadow-root'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import * as Dialog from '@radix-ui/react-dialog'
import { useState, type ReactNode, useCallback, useRef } from 'react'

import { FaIcon } from './fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { cn } from '@/helper/cn'

interface ModalWithCloseButtonProps {
  isOpen: boolean
  title?: string
  onCloseClick: () => void
  children: ReactNode
  className?: string
  confirmCloseDescription?: string | undefined
  extraTitleClassName?: string
  extraCloseButtonClassName?: string
}

export function ModalWithCloseButton({
  isOpen,
  title,
  onCloseClick,
  children,
  className,
  extraTitleClassName,
  confirmCloseDescription,
  extraCloseButtonClassName,
}: ModalWithCloseButtonProps) {
  const { strings } = useInstanceData()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const shadowRoot = useShadowRoot(ref)

  const appElement = getFirstElementOrUndefined(shadowRoot)

  const onRequestClose = useCallback(
    () =>
      confirmCloseDescription ? setShowConfirmation(true) : onCloseClick(),
    [confirmCloseDescription, onCloseClick]
  )

  return (
    <>
      <div ref={ref}></div>
      <Dialog.Root open={isOpen} onOpenChange={onRequestClose}>
        <Dialog.Portal container={appElement}>
          <Dialog.Overlay className={defaultModalOverlayStyles} />
          <Dialog.Content className={cn('serlo-modal', className)}>
            {title ? (
              <Dialog.Title className={cn('serlo-h2', extraTitleClassName)}>
                {title}
              </Dialog.Title>
            ) : null}
            <button
              onClick={onRequestClose}
              title={title}
              className={cn(
                `z-2 absolute right-3.5 top-3.5 inline-flex h-9 w-9 cursor-pointer items-center
              justify-center rounded-full border-none leading-tight
              text-almost-black hover:bg-brand hover:text-white`,
                extraCloseButtonClassName
              )}
              data-qa="modal-close-button"
            >
              <FaIcon icon={faXmark} className="h-5" />
            </button>

            {children}

            {showConfirmation && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-gray-500 bg-opacity-75 px-4">
                <div className="rounded-xl bg-editor-primary-100 p-6 shadow-lg ">
                  <p className="px-2">{confirmCloseDescription}</p>
                  <div className="mt-4 flex space-x-4">
                    <button
                      className="serlo-button-blue-transparent mr-4"
                      onClick={onCloseClick}
                    >
                      {strings.modal.leaveNow}
                    </button>
                    <button
                      className="serlo-button-blue"
                      onClick={() => setShowConfirmation(false)}
                    >
                      {strings.modal.noStay}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

export const defaultModalOverlayStyles = cn(
  'fixed bottom-0 left-0 right-0 top-0 z-[101] bg-white bg-opacity-75'
)
