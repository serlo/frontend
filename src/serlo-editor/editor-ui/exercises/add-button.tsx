import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/serlo-editor'
import clsx from 'clsx'

interface AddButtonProps {
  onClick: () => void
  children: string
  title?: string
  secondary?: boolean
}

export function AddButton({
  title,
  onClick,
  children,
  secondary,
}: AddButtonProps) {
  return (
    <button
      title={title}
      onMouseDown={onClick}
      className={clsx(
        secondary
          ? 'serlo-button-editor-secondary'
          : 'serlo-button-editor-primary',
        'mr-2'
      )}
    >
      <FaIcon icon={faPlus} /> {children}
    </button>
  )
}
