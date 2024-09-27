import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { useEditorStrings } from '@editor/utils/use-editor-strings'
import { faGripVertical } from '@fortawesome/free-solid-svg-icons'
import type { ConnectDragSource } from 'react-dnd'

interface RowDragButtonProps {
  drag: ConnectDragSource
}

export function RowDragButton({ drag }: RowDragButtonProps) {
  const editorStrings = useEditorStrings()

  return (
    <div
      className={cn(
        'rows-tools',
        'absolute left-2 z-[22] rounded-l-md bg-white bg-opacity-70 opacity-0 transition-opacity'
      )}
    >
      <button
        className={cn(`
            serlo-tooltip-trigger -mt-[3px] mb-1.5 cursor-grab select-none
            border-0 bg-none active:cursor-grabbing
        `)}
        ref={drag as unknown as React.LegacyRef<HTMLButtonElement>}
      >
        <EditorTooltip
          text={editorStrings.plugins.rows.dragElement}
          className="-ml-4 !pb-2"
        />
        <div
          className={cn(`
              serlo-button-editor-primary rounded-full bg-transparent px-1.5
              py-0.5 text-almost-black hover:bg-editor-primary-200
          `)}
          aria-hidden="true"
        >
          <FaIcon icon={faGripVertical} />
        </div>
      </button>
    </div>
  )
}
