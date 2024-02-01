import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { faGripVertical } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'
import type { ConnectDragSource } from 'react-dnd'

interface RowDragButtonProps {
  drag: ConnectDragSource
  isMultimediaPlugin: boolean
}

export function RowDragButton({
  drag,
  isMultimediaPlugin,
}: RowDragButtonProps) {
  const editorStrings = useEditorStrings()

  return (
    <div
      className={cn(
        'rows-tools',
        'absolute -left-14 top-0 z-[22] rounded-l-md bg-white bg-opacity-70 opacity-0 transition-opacity',
        isMultimediaPlugin && '!-left-5 !-top-10'
      )}
    >
      <button
        className={cn(`
            serlo-tooltip-trigger cursor-grab select-none
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
              serlo-button-editor-primary rounded-full bg-transparent
              px-3 py-2 text-almost-black hover:bg-editor-primary-200
          `)}
          aria-hidden="true"
        >
          <FaIcon icon={faGripVertical} className="!m-0 align-top" />
        </div>
      </button>
    </div>
  )
}
