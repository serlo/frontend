import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@serlo/frontend/src/helper/cn'
import { useRef } from 'react'

import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface AddRowButtonFloatingProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  focused?: boolean
  hide?: boolean
}

export function AddRowButtonFloating({
  onClick,
  focused,
  hide,
}: AddRowButtonFloatingProps) {
  const rowsStrings = useEditorStrings().plugins.rows
  const buttonRef = useRef<HTMLButtonElement>(null)

  const baseStyles = `
    opacity-0 transition-opacity duration-300
    relative mb-6 flex items-center px-8 w-full
    bg-gradient-to-b from-transparent via-white to-transparent
  `

  const stateStyles = `
    text-editor-primary-200
    hover:opacity-100 hover:z-50
    focus:opacity-100 focus:z-50
    ${focused ? 'opacity-40' : ''}
    focus-visible:text-editor-primary-200 
  `

  const interactionStyles = 'cursor-pointer'

  return hide ? null : (
    <button
      ref={buttonRef}
      className={cn(baseStyles, stateStyles, interactionStyles)}
      onClick={(event) => {
        onClick(event)

        // Imperatively calling blur, because inside the Shadow DOM, the
        // button somehow retains focus which shifts the suggestion menu
        // to the right!
        buttonRef?.current?.blur()
      }}
    >
      {/* Divider line */}
      <span className="flex-grow border-t-2 border-gray-300" />
      <span className="serlo-tooltip-trigger px-6 text-2xl">
        {/* Add button */}
        <FaIcon icon={faCirclePlus} />
        <EditorTooltip text={rowsStrings.addAnElement} />
      </span>
      {/* Divider line */}
      <span className="flex-grow border-t-2 border-gray-300" />
    </button>
  )
}
