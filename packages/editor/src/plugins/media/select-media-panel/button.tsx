import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FaIcon } from '@/components/fa-icon'

interface SelectMediaPanelButtonProps {
  onClick: () => void
  icon: IconDefinition
  label: string
}

export function SelectMediaPanelButton({
  onClick,
  icon,
  label,
}: SelectMediaPanelButtonProps) {
  return (
    <button
      className="min-w-[60%] rounded-md bg-editor-primary-200 p-2 font-bold hover:bg-editor-primary-300"
      onClick={onClick}
    >
      <FaIcon className="mr-2" icon={icon} />
      {label}
    </button>
  )
}
