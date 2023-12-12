import { faGripVertical } from '@fortawesome/free-solid-svg-icons'
import type { ConnectDragSource } from 'react-dnd'

import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/tailwind/helper/cn'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'

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
        ref={drag}
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
