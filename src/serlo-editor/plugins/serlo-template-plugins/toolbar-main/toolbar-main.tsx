import { faRedo, faSave, faUndo } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useState } from 'react'

import { ClientOnlyPortal } from './client-only-portal'
import { entity } from '../common/common'
import { FaIcon, type FaIconProps } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
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
  license?: StateTypeReturnType<(typeof entity)['license']>
  showSubscriptionOptions?: boolean
}

export function ToolbarMain({
  showSubscriptionOptions,
  changes,
  license,
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
          <div className="md:-ml-28 lg:-ml-52">
            {renderHistoryButton('Undo', faUndo, undo, !undoable)}
            {renderHistoryButton('Redo', faRedo, redo, !redoable)}
          </div>
          {renderSaveButton()}
        </nav>
      </ClientOnlyPortal>
      <SaveModal
        open={saveModalOpen}
        setOpen={setSaveModalOpen}
        changes={changes}
        license={license}
        showSubscriptionOptions={showSubscriptionOptions}
      />
    </>
  )

  function renderHistoryButton(
    title: string,
    icon: FaIconProps['icon'],
    action: typeof undo | typeof redo,
    disabled: boolean
  ) {
    return (
      <button
        className={clsx(
          'serlo-button serlo-tooltip-trigger',
          disabled ? 'cursor-default text-gray-300' : 'serlo-button-light'
        )}
        onClick={() => dispatch(action())}
        disabled={disabled}
      >
        <EditorTooltip text={title} className="top-8 !-ml-3" />
        <FaIcon icon={icon} />
      </button>
    )
  }

  function renderSaveButton() {
    return (
      <button
        className="serlo-button-green ml-2 md:mr-[-11.5vw] lg:-mr-52 xl:-mr-64"
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
