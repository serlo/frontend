import { FaIcon } from '@editor/editor-ui/fa-icon'
import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { selectHasPendingChanges, useAppSelector } from '@editor/store'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { SaveModal } from '@serlo/frontend/src/serlo-editor-integration/components/save-modal'
import { useState } from 'react'
import { createPortal } from 'react-dom'

import { useLeaveConfirm } from '@/helper/use-leave-confirm'

export function SaveButton() {
  const isChanged = useAppSelector(selectHasPendingChanges)
  const [saveModalOpen, setSaveModalOpen] = useState(false)

  const editStrings = useEditStrings()

  const handleClick = () =>
    isChanged
      ? setSaveModalOpen(true)
      : showToastNotice('👀 ' + editStrings.noChangesWarning)

  useLeaveConfirm(isChanged)

  if (typeof window === 'undefined') return null
  const target =
    document.querySelector('.editor-toolbar-right') ?? document.body

  return createPortal(
    <div className="sticky right-0 top-0">
      <button className="serlo-button-green" onClick={handleClick}>
        <FaIcon icon={faSave} /> {editStrings.edtrIo.save}
      </button>
      <SaveModal open={saveModalOpen} setOpen={setSaveModalOpen} />
    </div>,
    target
  )
}
