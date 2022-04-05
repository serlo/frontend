import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import { FaIcon } from '../fa-icon'

interface MobileMenuButtonProps {
  open: boolean
  onClick: () => void
}

export function MobileMenuButtonNew(props: MobileMenuButtonProps) {
  const { open, onClick } = props
  return (
    <button
      className={clsx(
        'sm:hidden absolute top-7 right-4',
        'border border-truegray-700 rounded-full w-12 h-12',
        'text-truegray-700 outline-none cursor-pointer'
      )}
      onClick={onClick}
      aria-label="Menu"
    >
      <FaIcon icon={open ? faTimes : faBars} className="h-8 mt-1" />
    </button>
  )
}
