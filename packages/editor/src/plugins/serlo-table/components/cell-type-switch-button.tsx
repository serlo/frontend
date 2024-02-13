import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import type { MouseEventHandler } from 'react'

interface CellTypeSwitchButtonProps {
  title: string
  icon: IconDefinition
  onClick: MouseEventHandler<HTMLButtonElement>
}

export function CellTypeSwitchButton(props: CellTypeSwitchButtonProps) {
  const { title, icon, onClick } = props

  return (
    <button
      onMouseDown={(e) => e.stopPropagation()} // hack to stop editor from stealing events
      onClick={onClick}
      className="serlo-button-editor-secondary absolute -mt-5 ml-3.5 block px-1 pb-0.25 pt-[3px] text-sm"
      title={title}
    >
      <FaIcon icon={icon} />
    </button>
  )
}
