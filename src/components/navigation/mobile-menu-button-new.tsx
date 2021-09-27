import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

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
      <FontAwesomeIcon icon={open ? faTimes : faBars} size="2x" />
    </button>
  )
}
