import { useScopedDispatch, useScopedSelector } from '@edtr-io/core'
import { StateTypeReturnType } from '@edtr-io/plugin'
import {
  redo,
  undo,
  hasRedoActions,
  hasUndoActions,
  getPendingChanges,
} from '@edtr-io/store'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo'
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave'
import { faUndo } from '@fortawesome/free-solid-svg-icons/faUndo'
import clsx from 'clsx'
import { useState } from 'react'
import { createPortal } from 'react-dom'

import { entity } from '../common/common'
import { useHandleSave } from '../helpers/use-handle-save'
import { FaIcon } from '@/components/fa-icon'
import { SaveModal } from '@/edtr-io/components/save-modal'
import { useLeaveConfirm } from '@/helper/use-leave-confirm'

interface ToolbarMainProps {
  changes?: StateTypeReturnType<typeof entity['changes']>
  license?: StateTypeReturnType<typeof entity['license']>
  subscriptions?: boolean
}

export function ToolbarMain({
  subscriptions,
  changes,
  license,
}: ToolbarMainProps) {
  const dispatch = useScopedDispatch()
  const undoable = useScopedSelector(hasUndoActions())
  const redoable = useScopedSelector(hasRedoActions())
  const pendingChanges = useScopedSelector(getPendingChanges())
  const hasPendingChanges = pendingChanges !== 0

  const [visible, setVisibility] = useState(false)

  const { handleSave, pending, hasError } = useHandleSave(
    visible,
    subscriptions
  )

  useLeaveConfirm(hasPendingChanges && !pending)

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
        visible={visible}
        setVisibility={setVisibility}
        handleSave={handleSave}
        pending={pending}
        changes={changes}
        hasError={hasError}
        license={license}
        subscriptions={subscriptions}
      />
    </>
  )

  function renderHistoryButton(
    title: string,
    icon: IconDefinition,
    action: typeof undo | typeof redo,
    disabled: boolean
  ) {
    return (
      <button
        className={clsx(
          'serlo-button',
          disabled
            ? 'text-gray-300 cursor-default'
            : 'serlo-make-interactive-light'
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
    const isDisabled = !hasPendingChanges
    return (
      <button
        className={clsx(
          'serlo-button ml-2',
          isDisabled
            ? 'text-gray-300 cursor-default'
            : 'serlo-make-interactive-green'
        )}
        onClick={() => setVisibility(true)}
        disabled={isDisabled}
        title="Save"
      >
        <FaIcon icon={faSave} />
      </button>
    )
  }
}
