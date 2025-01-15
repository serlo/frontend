import { FaIcon } from '@editor/editor-ui/fa-icon'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { cn } from '@/helper/cn'

interface AddButtonProps {
  onClick: () => void
  className?: string
  text: string
}

export function AddButton({ onClick, className, text }: AddButtonProps) {
  return (
    <button
      className={cn(
        'serlo-button-edit-secondary ml-side text-base leading-browser',
        className
      )}
      onClick={onClick}
    >
      <FaIcon icon={faPlus} /> {text}
    </button>
  )
}
