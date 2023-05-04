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
      className={`serlo-button bg-editor-primary-100 hover:bg-editor-primary text-base leading-browser ${
        className ?? ''
      }`}
      onClick={onClick}
    >
      {noIcon ? null : <Icon icon={faPlus} />} {text}
    </button>
  )
}
