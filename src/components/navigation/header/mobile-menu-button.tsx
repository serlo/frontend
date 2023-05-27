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
        'serlo-button absolute top-0 right-4 mt-5 block mobileExt:static md:hidden',
        'h-12 w-12 rounded-full bg-brand-200 text-brand',
        'outline-none'
      )}
    >
      <FaIcon icon={open ? faXmark : faBars} className="mt-1 h-8" />
    </button>
  )
}
