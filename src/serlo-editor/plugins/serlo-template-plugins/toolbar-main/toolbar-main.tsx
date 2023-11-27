import { faRedo, faSave, faUndo } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import { ClientOnlyPortal } from './client-only-portal'
import { entity } from '../common/common'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { cn } from '@/helper/cn'
import { showToastNotice } from '@/helper/show-toast-notice'
import { useLeaveConfirm } from '@/helper/use-leave-confirm'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'
import type { StateTypeReturnType } from '@/serlo-editor/plugin'
import {
  redo,
  undo,
  selectHasRedoActions,
  selectHasUndoActions,
  selectHasPendingChanges,
  useAppDispatch,
  useAppSelector,
} from '@/serlo-editor/store'
import { SaveModal } from '@/serlo-editor-integration/components/save-modal'

interface ToolbarMainProps {
  changes?: StateTypeReturnType<(typeof entity)['changes']>
  licenseId?: StateTypeReturnType<(typeof entity)['licenseId']>
  showSubscriptionOptions?: boolean
}

export function ToolbarMain({
  showSubscriptionOptions,
  changes,
  licenseId,
}: ToolbarMainProps) {
  const dispatch = useAppDispatch()
  const undoable = useAppSelector(selectHasUndoActions)
  const redoable = useAppSelector(selectHasRedoActions)
  const isChanged = useAppSelector(selectHasPendingChanges)
  const [saveModalOpen, setSaveModalOpen] = useState(false)

  useLeaveConfirm(isChanged)

  const editorStrings = useEditorStrings()

  return (
    <>
      <ClientOnlyPortal selector=".controls-portal">
        <nav className="flex h-14 w-full justify-between pl-5 pr-3 pt-6">
          <div className="pointer-events-auto md:-ml-28 lg:-ml-52">
            {renderHistoryButton('undo')}
            {renderHistoryButton('redo')}
          </div>
          {renderSaveButton()}
        </nav>
      </ClientOnlyPortal>
      <SaveModal
        open={saveModalOpen}
        setOpen={setSaveModalOpen}
        changes={changes}
        licenseId={licenseId}
        showSubscriptionOptions={showSubscriptionOptions}
      />
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

  function renderSaveButton() {
    return (
      <button
        className="serlo-button-green pointer-events-auto ml-2 md:mr-[-11.5vw] lg:-mr-52 xl:-mr-64"
        onClick={() => {
          if (isChanged) setSaveModalOpen(true)
          else showToastNotice('👀 ' + editorStrings.noChangesWarning)
        }}
      >
        <FaIcon icon={faSave} /> {editorStrings.edtrIo.save}
      </button>
    )
  }
}
