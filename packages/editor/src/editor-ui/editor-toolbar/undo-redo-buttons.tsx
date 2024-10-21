import {
  redo,
  undo,
  selectHasRedoActions,
  selectHasUndoActions,
  useAppDispatch,
  useAppSelector,
} from '@editor/store'
import { cn } from '@editor/utils/cn'
import { faRedo, faUndo } from '@fortawesome/free-solid-svg-icons'

import { EditorTooltip } from '../editor-tooltip'
import { FaIcon } from '../fa-icon'

export function UndoRedoButtons() {
  const dispatch = useAppDispatch()
  const undoable = useAppSelector(selectHasUndoActions)
  const redoable = useAppSelector(selectHasRedoActions)

  return (
    <>
      {renderHistoryButton('undo')}
      {renderHistoryButton('redo')}
    </>
  )

  function renderHistoryButton(type: 'undo' | 'redo') {
    const isUndo = type === 'undo'
    const disabled = isUndo ? !undoable : !redoable
    const onClick = () => dispatch(isUndo ? undo() : redo())
    return (
      <button
        className={cn(
          'serlo-button serlo-tooltip-trigger',
          disabled ? 'cursor-default text-gray-300' : 'serlo-button-light'
        )}
        onClick={onClick}
        disabled={disabled}
        data-qa={`editor-toolbar-${type}`}
      >
        <EditorTooltip
          text={isUndo ? 'Undo' : 'Redo'}
          className="top-8 !-ml-3"
        />
        <FaIcon icon={isUndo ? faUndo : faRedo} />
      </button>
    )
  }
}
