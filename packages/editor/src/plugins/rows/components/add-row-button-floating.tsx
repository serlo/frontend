import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { useEditorStrings } from '@editor/utils/use-editor-strings'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react'

interface AddRowButtonFloatingProps {
  focused: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export function AddRowButtonFloating(props: AddRowButtonFloatingProps) {
  const { focused, onClick } = props
  const rowsStrings = useEditorStrings().plugins.rows
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <button
      ref={buttonRef}
      className={cn(
        `
        relative -top-4 mb-6 flex w-full cursor-pointer items-center bg-gradient-to-b
        from-transparent via-white to-transparent px-8 text-editor-primary-200 opacity-0
        transition-opacity duration-300 hover:z-50 hover:opacity-100 focus:z-50 focus:opacity-100
        `,
        focused && 'opacity-40'
      )}
      onClick={onClick}
    >
      <span className="flex-grow border-t-2 border-gray-300" />
      <span className="serlo-tooltip-trigger px-6 text-2xl">
        <FaIcon icon={faCirclePlus} />
        <EditorTooltip text={rowsStrings.addAnElement} />
      </span>
      <span className="flex-grow border-t-2 border-gray-300" />
    </button>
  )
}
