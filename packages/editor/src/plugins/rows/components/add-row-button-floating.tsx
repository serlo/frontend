import IconAddRow from '@editor/editor-ui/assets/plugin-icons/icon-add-row.svg'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { cn } from '@serlo/frontend/src/helper/cn'

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

  if (hide) return null
  return (
    <>
      <div
        className={cn(
          'group ',
          'opacity-0 transition-opacity duration-300',
          'relative mb-4 flex items-center px-8 pb-2',
          'text-editor-primary-200 hover:opacity-100',
          'focus-visible:text-editor-primary-200 group-hover:opacity-100',
          'cursor-pointer'
        )}
        onClick={onClick}
      >
        {/* Divider line */}
        <div className="flex-grow border-t-2 border-gray-300"></div>
        <div className={cn('group/btn serlo-tooltip-trigger relative px-6')}>
          {/* Add button */}
          <IconAddRow className="" />
          <EditorTooltip
            text={rowsStrings.addAnElement}
            className="align-center"
          />
        </div>
        {/* Divider line */}
        <div className="flex-grow border-t-2 border-gray-300"></div>
      </div>
    </>
  )
}
