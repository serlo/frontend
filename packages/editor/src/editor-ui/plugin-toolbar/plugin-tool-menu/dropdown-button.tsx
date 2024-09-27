import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface DropdownButtonProps {
  onClick: () => void
  label: string
  icon: IconDefinition
  dataQa?: string
  separatorTop?: boolean
}

export function DropdownButton({
  onClick,
  label,
  icon,
  dataQa,
  separatorTop,
}: DropdownButtonProps) {
  return (
    <button
      className={cn(
        'group/button w-full px-3 text-left',
        separatorTop && 'mt-2.5 border-t pt-2.5'
      )}
      onClick={onClick}
      data-qa={dataQa}
    >
      <span className="serlo-button-editor-secondary w-fit rounded-xl bg-transparent text-sm group-hover/button:bg-editor-primary-200">
        <FaIcon icon={icon} /> {label}
      </span>
    </button>
  )
}
