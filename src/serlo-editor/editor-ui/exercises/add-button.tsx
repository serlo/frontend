import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '@/components/fa-icon'

interface AddButtonProps {
  onClick: () => void
  children: string
  title?: string
}

export function AddButton({ title, onClick, children }: AddButtonProps) {
  return (
    <button
      title={title}
      onMouseDown={onClick}
      className="serlo-button-editor-primary mr-2"
    >
      <FaIcon icon={faPlus} /> {children}
    </button>
  )
}
