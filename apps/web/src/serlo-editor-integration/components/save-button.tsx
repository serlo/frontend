import type { AnyEditorDocument } from '@editor/package'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { createPortal } from 'react-dom'

import { SaveModal } from './save-modal'
import type { SerloEditorProps } from '../serlo-editor'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { showToastNotice } from '@/helper/show-toast-notice'
import { useLeaveConfirm } from '@/helper/use-leave-confirm'

export function SaveButton({
  onSave,
  isChanged,
  selectRootDocument,
  isInTestArea,
}: {
  onSave: SerloEditorProps['onSave']
  isChanged: boolean
  selectRootDocument: () => AnyEditorDocument
  isInTestArea?: boolean
}) {
  const [saveModalOpen, setSaveModalOpen] = useState(false)

  const saveButtonStrings = useInstanceData().strings.saveButton

  const handleClick = () =>
    isChanged
      ? setSaveModalOpen(true)
      : showToastNotice('👀 ' + saveButtonStrings.noChangesWarning)

  useLeaveConfirm(isChanged)

  if (typeof window === 'undefined') return null
  const target =
    document.querySelector('.editor-toolbar-right') ?? document.body

  return createPortal(
    <div className="sticky right-0 top-0">
      <button className="serlo-button-edit-primary" onClick={handleClick}>
        <FaIcon icon={faSave} /> {saveButtonStrings.save}
      </button>
      <SaveModal
        open={saveModalOpen}
        setOpen={setSaveModalOpen}
        onSave={onSave}
        selectRootDocument={selectRootDocument}
        isInTestArea={isInTestArea}
      />
    </div>,
    target
  )
}
