import IconAddRow from '@editor/editor-ui/assets/plugin-icons/icon-add-row.svg'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'
import { useState } from 'react'

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

  const [isHovered, setIsHovered] = useState(false)

  if (hide) return null
  return (
    <div
      className={cn(
        'group',
        'relative flex items-center',
        'hover:text-editor-primary-300 hover:opacity-100',
        'focus-visible:text-editor-primary-300 group-hover:opacity-100',
        focused ? 'opacity-100' : 'opacity-0'
      )}
    >
      {/* Divider line */}
      <div className="flex-grow border-t-2 border-gray-300"></div>
      <div
        className={cn(
          'group/btn relative px-4 ',
          isHovered ? 'text-editor-primary-300' : 'text-editor-primary-200'
        )}
      >
        {/* Add button */}
        <IconAddRow />
        {/* clickability zone, wider than button */}
        <button
          className="absolute inset-0 -ml-[100px] -mr-[100px] cursor-pointer"
          aria-label="Add"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          title={rowsStrings.addAnElement}
          onClick={onClick}
          data-qa="add-new-plugin-row-button"
        >
          <div className="h-full w-full" />
        </button>
      </div>
      {/* Divider line */}
      <div className="flex-grow border-t-2 border-gray-300"></div>
    </div>
  )
}
