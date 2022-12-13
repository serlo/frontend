import { useScopedDispatch, useScopedSelector } from '@edtr-io/core'
import { StateTypeReturnType } from '@edtr-io/plugin'
import {
  redo,
  undo,
  hasRedoActions,
  hasUndoActions,
  hasPendingChanges,
} from '@edtr-io/store'
import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo'
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave'
import { faUndo } from '@fortawesome/free-solid-svg-icons/faUndo'
import clsx from 'clsx'
import { useState } from 'react'
import { createPortal } from 'react-dom'

import { entity } from '../common/common'
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
  const dispatch = useScopedDispatch()
  const undoable = useScopedSelector(hasUndoActions())
  const redoable = useScopedSelector(hasRedoActions())
  const isChanged = useScopedSelector(hasPendingChanges())

  const [saveModalOpen, setSaveModalOpen] = useState(false)

  useLeaveConfirm(isChanged && !pending)

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null

  return (
    <>
      {createPortal(
        <nav
          className={clsx('w-full flex justify-between', 'h-12 pt-4 pl-5 pr-3')}
        >
          <div>
            {renderHistoryButton('Undo', faUndo, undo, !undoable)}
            {renderHistoryButton('Redo', faRedo, redo, !redoable)}
          </div>
          <div>{renderSaveButton()}</div>
        </nav>,
        document.getElementsByClassName('controls-portal')[0]
      )}
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
          disabled ? 'text-gray-300 cursor-default' : 'serlo-button-light'
        )}
        onClick={() => {
          dispatch(action())
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
        className={clsx('serlo-button-green ml-2')}
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
