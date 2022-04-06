import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import clsx from 'clsx'

import { FaIcon } from '../fa-icon'

interface MobileMenuButtonProps {
  open: boolean
  onClick: () => void
}

export function MobileMenuButton(props: MobileMenuButtonProps) {
  const { open, onClick } = props
  return (
    <button
      onClick={onClick}
      aria-label="Menu"
      className={clsx(
        'sm:hidden absolute top-4 right-4',
        'rounded-full bg-brand-150 text-brand w-12 h-12',
        'outline-none'
      )}
    >
      <FaIcon icon={open ? faTimes : faBars} className="h-8 mt-1" />
    </button>
  )
}
