import { faCreativeCommons } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react'

import type { SolutionProps } from '.'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { ModalWithCloseButton } from '@serlo/frontend/src/components/modal-with-close-button'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'

interface SerloLicenseChooserProps {
  licenseId: SolutionProps['state']['licenseId']
}

export function SerloLicenseChooser({ licenseId }: SerloLicenseChooserProps) {
  const solutionStrings = useEditorStrings().templatePlugins.solution
  const [showLicenseModal, setShowLicenseModal] = useState(false)

  const { licenses } = useInstanceData()

  return (
    <>
      <div className="absolute right-12 top-0 z-20">
        <button
          className="serlo-button-editor-secondary serlo-tooltip-trigger mr-2"
          onClick={() => setShowLicenseModal(true)}
        >
          <EditorTooltip text={solutionStrings.changeLicense} />
          <FaIcon icon={faCreativeCommons} />
        </button>
      </div>
      {showLicenseModal ? (
        <ModalWithCloseButton
          isOpen={showLicenseModal}
          onCloseClick={() => setShowLicenseModal(false)}
          className="top-8 max-w-xl translate-y-0 sm:top-1/3"
        >
          <h3 className="serlo-h3 mt-4">{solutionStrings.changeLicense}:</h3>

          <div className="mx-side mb-3">
            <select
              className="serlo-button-light serlo-input-font-reset max-w-md"
              onChange={(e) => {
                if (licenseId.defined) licenseId.set(parseInt(e.target.value))
                else licenseId.create(parseInt(e.target.value))
              }}
              value={licenseId.defined ? licenseId.value : undefined}
            >
              {licenses.map(({ id, title }) => {
                return (
                  <option
                    className="bg-brand-200 text-brand"
                    key={id}
                    value={id}
                  >
                    {id} {title}
                  </option>
                )
              })}
            </select>
          </div>
        </ModalWithCloseButton>
      ) : null}
    </>
  )
}
