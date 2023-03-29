import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import { FaIcon } from '@/components/fa-icon'

interface MobileMenuButtonProps {
  open: boolean
  onClick: () => void
}

export function MobileMenuButton(props: MobileMenuButtonProps) {
  const { open, onClick } = props
  return (
    <button
      onClick={onClick}
      tabIndex={0}
      aria-label="Menu"
      className={clsx(
        'serlo-button md:hidden absolute mt-5 top-0 right-4 mobileExt:static block',
        'rounded-full bg-brand-200 text-brand w-12 h-12',
        'outline-none'
      )}
    >
      <FaIcon icon={open ? faXmark : faBars} className="h-8 mt-1" />
    </button>
  )
}
