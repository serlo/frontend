import { useShadowRoot } from '@editor/core/hooks/use-shadow-root'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import type { StateTypeReturnType } from '@editor/plugin'
import { selectHasPendingChanges, useAppSelector } from '@editor/store'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { SaveModal } from '@serlo/frontend/src/serlo-editor-integration/components/save-modal'
import { useRef, useState } from 'react'

import { ClientOnlyPortal } from './client-only-portal'
import { LeaveConfirmation } from './leave-confirmation-render-null'
import { entity } from '../../plugins/serlo-template-plugins/common/common'

interface ToolbarMainProps {
  changes?: StateTypeReturnType<(typeof entity)['changes']>
  licenseId?: StateTypeReturnType<(typeof entity)['licenseId']>
  showSubscriptionOptions?: boolean
}

const isNextApp = () => {
  return Boolean(document.getElementById('__next'))
}

export function SaveButton({
  showSubscriptionOptions,
  changes,
  licenseId,
}: ToolbarMainProps) {
  const isChanged = useAppSelector(selectHasPendingChanges)
  const [saveModalOpen, setSaveModalOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const shadowRoot = useShadowRoot(containerRef)

  const editStrings = useEditStrings()

  const handleClick = () =>
    isChanged
      ? setSaveModalOpen(true)
      : showToastNotice('👀 ' + editStrings.noChangesWarning)

  return (
    <div ref={containerRef}>
      {/* For the web component export, we don't want to call the useLeaveConfirm hook as the next router won't be available */}
      {isNextApp() && <LeaveConfirmation isChanged={isChanged} />}
      <ClientOnlyPortal
        selector=".save-button-portal"
        shadowRootRef={shadowRoot}
      >
        <button
          className="serlo-button-green pointer-events-auto mb-0"
          onClick={handleClick}
        >
          <FaIcon icon={faSave} /> {editStrings.edtrIo.save}
        </button>
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
}
