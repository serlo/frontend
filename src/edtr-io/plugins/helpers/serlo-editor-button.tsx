import { faPlus, Icon } from '@edtr-io/ui'

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
      className={`serlo-button bg-amber-100 hover:bg-amber-300 text-base leading-browser ${
        className ?? ''
      }`}
      onClick={onClick}
    >
      {noIcon ? null : <Icon icon={faPlus} />} {text}
    </button>
  )
}
