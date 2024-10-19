import { FaIcon } from '@editor/editor-ui/fa-icon'
import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { selectHasPendingChanges, useAppSelector } from '@editor/store'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { SaveModal } from '@serlo/frontend/src/serlo-editor-integration/components/save-modal'
import { useState } from 'react'

import { LeaveConfirmation } from './leave-confirmation-render-null'

const isNextApp = () => {
  return Boolean(document.getElementById('__next'))
}

export function SaveButton() {
  const isChanged = useAppSelector(selectHasPendingChanges)
  const [saveModalOpen, setSaveModalOpen] = useState(false)

  const editStrings = useEditStrings()

  const handleClick = () =>
    isChanged
      ? setSaveModalOpen(true)
      : showToastNotice('👀 ' + editStrings.noChangesWarning)

  return (
    <div>
      {/* For the web component export, we don't want to call the useLeaveConfirm hook as the next router won't be available */}
      {isNextApp() && <LeaveConfirmation isChanged={isChanged} />}

      <button
        className="serlo-button-green pointer-events-auto mb-0"
        onClick={handleClick}
      >
        <FaIcon icon={faSave} /> {editStrings.edtrIo.save}
      </button>
      <SaveModal open={saveModalOpen} setOpen={setSaveModalOpen} />
    </div>
  )
}
