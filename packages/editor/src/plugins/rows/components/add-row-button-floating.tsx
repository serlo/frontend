import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'
import { useRef } from 'react'

interface AddRowButtonFloatingProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  focused?: boolean
  hide?: boolean
}

export function AddRowButtonFloating({
  focused,
  onClick,
  hide,
}: AddRowButtonFloatingProps) {
  const rowsStrings = useEditorStrings().plugins.rows
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="absolute bottom-0 z-[1] h-auto w-full translate-y-full">
      {hide ? null : (
        <div className="group flex justify-center">
          <button
            className={cn(
              `
              add-trigger z-20 h-7 w-7
              rounded-full pt-1 text-center
              text-gray-600 transition-all hover:cursor-pointer
              hover:text-editor-primary hover:opacity-100
              focus-visible:text-editor-primary group-hover:opacity-60
              `,
              focused ? 'opacity-60' : 'opacity-0'
            )}
            title={rowsStrings.addAnElement}
            onClick={(event) => {
              onClick(event)

              // Imperatively calling blur, because inside the Shadow DOM, the
              // button somehow retains focus which shifts the suggestion menu
              // to the right!
              if (buttonRef.current) {
                buttonRef.current.blur()
              }
            }}
            data-qa="add-new-plugin-row-button"
            ref={buttonRef}
          >
            <FaIcon icon={faCirclePlus} className="text-xl" />
          </button>
        </div>
      )}
    </div>
  )
}
