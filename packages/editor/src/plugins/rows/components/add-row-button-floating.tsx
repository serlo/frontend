import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@serlo/frontend/src/helper/cn'
import { useRef } from 'react'

import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface AddRowButtonFloatingProps {
  onClick: React.MouseEventHandler<HTMLElement>
  focused?: boolean
  hide?: boolean
}

export function AddRowButtonFloating({
  onClick,
  hide,
}: AddRowButtonFloatingProps) {
  const rowsStrings = useEditorStrings().plugins.rows
  const buttonRef = useRef<HTMLButtonElement>(null)

  if (hide) return null

  const baseStyles = `
  group
  opacity-0 transition-opacity duration-300
  relative mb-4 flex items-center px-8 pb-2
`

  const stateStyles = `
  text-editor-primary-200 hover:opacity-100
  focus-visible:text-editor-primary-200 group-hover:opacity-100
`

  const interactionStyles = 'cursor-pointer'

  return (
    <>
      <div
        className={cn(baseStyles, stateStyles, interactionStyles)}
        onClick={(event) => {
          onClick(event)

          // Imperatively calling blur, because inside the Shadow DOM, the
          // button somehow retains focus which shifts the suggestion menu
          // to the right!
          if (buttonRef.current) {
            buttonRef.current.blur()
          }
        }}
      >
        {/* Divider line */}
        <div className="flex-grow border-t-2 border-gray-300" />
        <div className="group/btn serlo-tooltip-trigger relative px-6 text-2xl">
          {/* Add button */}
          <FaIcon icon={faCirclePlus} />
          <EditorTooltip text={rowsStrings.addAnElement} />
        </div>
        {/* Divider line */}
        <div className="flex-grow border-t-2 border-gray-300" />
      </div>
    </>
  )
}
