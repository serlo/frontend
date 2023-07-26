import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import { FaIcon } from '@/components/fa-icon'

interface DropdownButtonProps {
  onClick: () => void
  label: string
  icon: IconDefinition
  className?: string
}

export function DropdownButton({
  onClick,
  label,
  icon,
  className,
}: DropdownButtonProps) {
  return (
    <button
      className={clsx('group/button w-full px-3 text-left', className)}
      onClick={onClick}
    >
      <span className="serlo-button-editor-secondary w-fit rounded-xl bg-transparent text-sm group-hover/button:bg-editor-primary-200">
        <FaIcon icon={icon} /> {label}
      </span>
    </button>
  )
}
