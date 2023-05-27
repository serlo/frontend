import { faXmark } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import BaseModal from 'react-modal'

import { FaIcon } from './fa-icon'
import { useInstanceData } from '@/contexts/instance-context'

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
}

export function ModalWithCloseButton({
  isOpen,
  title,
  onCloseClick,
  children,
  className,
}: ModalWithCloseButtonProps) {
  const { strings } = useInstanceData()

  return (
    <BaseModal
      isOpen={isOpen}
      onRequestClose={onCloseClick}
      shouldReturnFocusAfterClose={false}
      className={clsx(ModalClsx, 'top-[40%] w-[500px] pb-10', className)}
    >
      {title && <h2 className="serlo-h2">{title}</h2>}
      {children}
      <button
        onClick={onCloseClick}
        title={strings.share.close}
        className={clsx(
          'absolute top-3.5 right-3.5 cursor-pointer border-none bg-transparent',
          'inline-block leading-tight text-almost-black hover:bg-brand hover:text-white',
          'h-9 w-9 rounded-full text-center '
        )}
      >
        <FaIcon icon={faXmark} className="h-5" />
      </button>
    </BaseModal>
  )
}

export const ModalClsx = /* className={ */ clsx(
  'absolute left-1/2 -mr-[50%] -translate-x-1/2 -translate-y-1/2',
  'rounded-xl max-w-[85%] border-none shadow-modal',
  'bg-white outline-none px-2.5 pt-2.5'
) /* } */
