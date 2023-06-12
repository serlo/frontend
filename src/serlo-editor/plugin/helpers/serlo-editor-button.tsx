import { faPlus, Icon } from '@/serlo-editor/ui'

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
      className={`serlo-button-editor-secondary text-base leading-browser ${
        className ?? ''
      }`}
      onClick={onClick}
    >
      {noIcon ? null : <Icon icon={faPlus} />} {text}
    </button>
  )
}
