import { StateTypeReturnType } from '@edtr-io/plugin'
import {
  redo,
  undo,
  selectHasRedoActions,
  selectHasUndoActions,
  selectHasPendingChanges,
  useAppDispatch,
  useAppSelector,
} from '@edtr-io/store'
import { faRedo, faSave, faUndo } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useState } from 'react'

import { entity } from '../common/common'
import { ClientOnlyPortal } from './client-only-portal'
import { FaIcon, FaIconProps } from '@/components/fa-icon'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { SaveModal } from '@/edtr-io/components/save-modal'
import { showToastNotice } from '@/helper/show-toast-notice'
import { useLeaveConfirm } from '@/helper/use-leave-confirm'

interface ToolbarMainProps {
  changes?: StateTypeReturnType<typeof entity['changes']>
  license?: StateTypeReturnType<typeof entity['license']>
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

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null

  return (
    <>
      <ClientOnlyPortal selector=".controls-portal">
        <nav className="flex h-12 w-full justify-between pt-4 pl-5 pr-3">
          <div>
            {renderHistoryButton('Undo', faUndo, undo, !undoable)}
            {renderHistoryButton('Redo', faRedo, redo, !redoable)}
          </div>
          <div>{renderSaveButton()}</div>
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
          'serlo-button',
          disabled ? 'cursor-default text-gray-300' : 'serlo-button-light'
        )}
        onClick={() => {
          void dispatch(action())
        }}
        disabled={disabled}
        title={title}
      >
        <FaIcon icon={icon} />
      </button>
    )
  }

  function renderSaveButton() {
    return (
      <button
        className="serlo-button-green ml-2"
        onClick={() => {
          if (isChanged) setSaveModalOpen(true)
          else
            showToastNotice(
              '👀 ' + loggedInData!.strings.editor.noChangesWarning
            )
        }}
        title="Save"
      >
        <FaIcon icon={faSave} /> {loggedInData!.strings.editor.edtrIo.save}
      </button>
    )
  }
}
