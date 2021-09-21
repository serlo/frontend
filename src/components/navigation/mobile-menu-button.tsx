import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

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
      <FontAwesomeIcon icon={open ? faTimes : faBars} size="2x" />
    </button>
  )
}
