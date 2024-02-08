import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { faCreativeCommons } from '@fortawesome/free-brands-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { ModalWithCloseButton } from '@serlo/frontend/src/components/modal-with-close-button'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { useState } from 'react'

import type { SolutionProps } from '.'
import { cn } from '@/helper/cn'

interface SerloLicenseChooserProps {
  licenseId: SolutionProps['state']['licenseId']
  className?: string
}

export function SerloLicenseChooser({
  licenseId,
  className,
}: SerloLicenseChooserProps) {
  const solutionStrings = useEditorStrings().templatePlugins.solution
  const [showLicenseModal, setShowLicenseModal] = useState(false)

  const { licenses } = useInstanceData()

  return (
    <>
      <button
        className={cn(
          'absolute -top-0.5 right-12 z-20',
          'serlo-button-editor-secondary serlo-tooltip-trigger mr-2',
          className
        )}
        onMouseDown={(e) => {
          // prevents plugin from stealing focus
          e.preventDefault()
          e.stopPropagation()
        }}
        onClick={() => {
          setShowLicenseModal(true)
        }}
      >
        <EditorTooltip text={solutionStrings.changeLicense} />
        <FaIcon icon={faCreativeCommons} />
      </button>
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
