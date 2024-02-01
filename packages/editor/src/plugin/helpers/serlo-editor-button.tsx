import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'

import { cn } from '@/helper/cn'

interface SerloAddButtonProps {
  onClick: () => void
  className?: string
  text: string
  noIcon?: boolean
}

export function SerloAddButton({
  onClick,
  className,
  text,
  noIcon,
}: SerloAddButtonProps) {
  return (
    <button
      className={cn(
        'serlo-button-editor-secondary ml-side text-base leading-browser',
        className && className
      )}
      onClick={onClick}
    >
      {noIcon ? null : <FaIcon icon={faPlus} />} {text}
    </button>
  )
}
