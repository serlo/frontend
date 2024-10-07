import { faXmark } from '@fortawesome/free-solid-svg-icons'
import * as Dialog from '@radix-ui/react-dialog'
import { useState, type ReactNode, useCallback, useRef, useEffect } from 'react'

import { FaIcon } from './fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { cn } from '@/helper/cn'

export interface ModalWithCloseButtonProps {
  title: string
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  children: ReactNode
  className?: string
  confirmCloseDescription?: string | undefined
  extraTitleClassName?: string
  extraCloseButtonClassName?: string
  extraOverlayClassName?: string
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void
  appElementOverride?: HTMLElement
}

export function ModalWithCloseButton({
  isOpen,
  title,
  setIsOpen,
  children,
  className,
  extraTitleClassName,
  confirmCloseDescription,
  extraCloseButtonClassName,
  extraOverlayClassName,
  onEscapeKeyDown,
  onKeyDown,
  appElementOverride,
}: ModalWithCloseButtonProps) {
  const { strings } = useInstanceData()

  const [showConfirmation, setShowConfirmation] = useState(false)
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null)

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open && confirmCloseDescription) {
        setShowConfirmation(true)
        return
      }

      if (open !== false) {
        setIsOpen(open)
        return
      }
      // Need to add this tiny delay when unmounting the modal, so that the
      // use-blur-on-outside-click has time to detect whether the modal is open
      // or not.
      if (open === false) {
        setTimeout(() => {
          setIsOpen(open)
        }, 1)
      }
    },
    [confirmCloseDescription, setIsOpen]
  )

  // Restores the focus to the previous element!
  useEffect(() => {
    if (!isOpen) {
      if (previouslyFocusedElementRef.current) {
        previouslyFocusedElementRef.current.focus()
      }
      return
    }
    previouslyFocusedElementRef.current = document.activeElement as HTMLElement
  }, [isOpen])

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
        <Dialog.Portal container={appElementOverride}>
          <Dialog.Overlay
            className={cn(defaultModalOverlayStyles, extraOverlayClassName)}
          />
          <Dialog.Content
            className={cn('serlo-modal', className)}
            data-modal-state={isOpen ? 'open' : 'closed'}
            aria-describedby={undefined}
            onEscapeKeyDown={onEscapeKeyDown}
            onKeyDown={onKeyDown}
          >
            {title ? (
              <Dialog.Title className={cn('serlo-h2', extraTitleClassName)}>
                {title}
              </Dialog.Title>
            ) : null}

            {children}
            <Dialog.Close
              aria-label="Close"
              onClick={() => onOpenChange(false)}
              title={title}
              className={cn(
                `absolute right-3.5 top-3.5 z-20 inline-flex h-9 w-9 cursor-pointer items-center
              justify-center rounded-full border-none leading-tight
              text-almost-black hover:bg-brand hover:text-white`,
                extraCloseButtonClassName
              )}
              data-qa="modal-close-button"
            >
              <FaIcon icon={faXmark} className="h-5" />
            </Dialog.Close>

            {showConfirmation && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-gray-500 bg-opacity-75 px-4">
                <div className="rounded-xl bg-editor-primary-100 p-6 shadow-lg ">
                  <p className="px-2">{confirmCloseDescription}</p>
                  <div className="mt-4 flex space-x-4">
                    <button
                      className="serlo-button-blue-transparent mr-4"
                      onClick={() => setIsOpen(false)}
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
