import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { cn } from '@serlo/tailwind/helper/cn'

interface DropdownButtonProps {
  onClick: () => void
  label: string
  icon: IconDefinition
  className?: string
  dataQa?: string
}

export function DropdownButton({
  onClick,
  label,
  icon,
  className,
  dataQa,
}: DropdownButtonProps) {
  return (
    <button
      className={cn('group/button w-full px-3 text-left', className)}
      onClick={onClick}
      data-qa={dataQa}
    >
      <span className="serlo-button-editor-secondary w-fit rounded-xl bg-transparent text-sm group-hover/button:bg-editor-primary-200">
        <FaIcon icon={icon} /> {label}
      </span>
    </button>
  )
}
