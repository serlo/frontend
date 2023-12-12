import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@serlo/tailwind/helper/cn'

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
      className={cn(`
        serlo-button absolute right-4 top-0 mt-5 block h-12 w-12
        rounded-full bg-brand-200 text-brand outline-none
         mobileExt:static md:hidden
      `)}
    >
      <FaIcon icon={open ? faXmark : faBars} className="mt-1 h-8" />
    </button>
  )
}
