import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { HoverOverlay, HoverPosition } from '@editor/editor-ui'

export function InlineSettings({
  position = 'below',
  ...props
}: {
  children: React.ReactNode
  onDelete?: React.MouseEventHandler
  position: HoverPosition
  anchor?: React.RefObject<HTMLElement>
}) {
  return (
    <HoverOverlay position={position} anchor={props.anchor}>
      <span className="px-2">{props.children}</span>
      {props.onDelete ? (
        <div
          onClick={props.onDelete}
          className="m-0.5 inline-block cursor-pointer border-l-2 border-almost-black p-[5px] pl-2.5 hover:text-editor-primary"
        >
          <FaIcon icon={faTrashAlt} />
        </div>
      ) : null}
    </HoverOverlay>
  )
}
