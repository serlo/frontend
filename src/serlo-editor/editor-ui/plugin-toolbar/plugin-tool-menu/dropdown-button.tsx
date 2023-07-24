import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '@/components/fa-icon'

interface DropdownButtonProps {
  onClick: () => void
  label: string
  icon: IconDefinition
}

export function DropdownButton({ onClick, label, icon }: DropdownButtonProps) {
  return (
    <button className="group/button w-full pl-3 text-left" onClick={onClick}>
      <span className="serlo-button-editor-secondary w-fit bg-transparent text-sm group-hover/button:bg-editor-primary">
        <FaIcon icon={icon} /> {label}
      </span>
    </button>
  )
}
