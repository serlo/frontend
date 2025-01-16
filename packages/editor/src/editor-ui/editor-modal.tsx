import { useIsSerlo } from '@editor/core/hooks/use-is-serlo'
import { cn } from '@editor/utils/cn'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import * as Dialog from '@radix-ui/react-dialog'
import { type ReactNode, useCallback, useRef, useEffect } from 'react'

import { FaIcon } from './fa-icon'

interface EditorModalProps {
  title: string
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  children: ReactNode
  className?: string
  extraTitleClassName?: string
  extraCloseButtonClassName?: string
  extraOverlayClassName?: string
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void
}

export function EditorModal({
  isOpen,
  title,
  setIsOpen,
  children,
  className,
  extraTitleClassName,
  extraCloseButtonClassName,
  extraOverlayClassName,
  onEscapeKeyDown,
  onKeyDown,
}: EditorModalProps) {
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null)

  const isSerlo = useIsSerlo()
  const onOpenChange = useCallback(
    (open: boolean) => {
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
    [setIsOpen]
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
        <Dialog.Portal>
          <Dialog.Overlay
            className={cn(defaultModalOverlayStyles, extraOverlayClassName)}
          />
          <Dialog.Content
            className={cn(
              'serlo-modal',
              className,
              // The moodle navigation bar has a z-index of 1030...
              !isSerlo && 'z-[1040]'
            )}
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
                `absolute right-3.5 top-3.5 z-20 inline-flex flow-root h-9 w-9 cursor-pointer
                 items-center justify-center rounded-full border-none
                 leading-tight text-almost-black hover:bg-brand hover:text-white`,
                extraCloseButtonClassName
              )}
              data-qa="modal-close-button"
            >
              <FaIcon icon={faXmark} className="h-5" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

export const defaultModalOverlayStyles = cn(
  'fixed bottom-0 left-0 right-0 top-0 z-[101] bg-white bg-opacity-75'
)
