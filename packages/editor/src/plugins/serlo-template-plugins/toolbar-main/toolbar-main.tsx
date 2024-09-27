import { useShadowRoot } from '@editor/core/helpers/use-shadow-root'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import type { StateTypeReturnType } from '@editor/plugin'
import {
  redo,
  undo,
  selectHasRedoActions,
  selectHasUndoActions,
  selectHasPendingChanges,
  useAppDispatch,
  useAppSelector,
} from '@editor/store'
import { cn } from '@editor/utils/cn'
import { faRedo, faSave, faUndo } from '@fortawesome/free-solid-svg-icons'
import { SaveModal } from '@serlo/frontend/src/serlo-editor-integration/components/save-modal'
import { useRef, useState } from 'react'

import { ClientOnlyPortal } from './client-only-portal'
import { LeaveConfirmation } from './leave-confirmation-render-null'
import { entity } from '../common/common'

interface ToolbarMainProps {
  changes?: StateTypeReturnType<(typeof entity)['changes']>
  licenseId?: StateTypeReturnType<(typeof entity)['licenseId']>
  showSubscriptionOptions?: boolean
}

const isNextApp = () => {
  return Boolean(document.getElementById('__next'))
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
  const containerRef = useRef<HTMLDivElement>(null)
  const shadowRoot = useShadowRoot(containerRef)

  const editorStrings = useEditStrings()

  return (
    <div ref={containerRef}>
      {/* For the web component export, we don't want to call the useLeaveConfirm hook as the next router won't be available */}
      {isNextApp() && <LeaveConfirmation isChanged={isChanged} />}
      <ClientOnlyPortal selector=".controls-portal" shadowRootRef={shadowRoot}>
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
    </div>
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
          if (
            isChanged ||
            changes?.value.startsWith('[KI generiert]:') ||
            false
          ) {
            setSaveModalOpen(true)
          } else {
            showToastNotice('👀 ' + editorStrings.noChangesWarning)
          }
        }}
      >
        <FaIcon icon={faSave} /> {editorStrings.edtrIo.save}
      </button>
    )
  }
}
