import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '@/components/fa-icon'

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
      className={`serlo-button-editor-secondary ml-side text-base leading-browser ${
        className ?? ''
      }`}
      onClick={onClick}
    >
      {noIcon ? null : <FaIcon icon={faPlus} />} {text}
    </button>
  )
}
