import { EditorModal } from '@editor/editor-ui/editor-modal'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { useEditorStrings } from '@editor/utils/use-editor-strings'
import { useInstanceData } from '@editor/utils/use-instance-data'
import { faCreativeCommons } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react'

import type { SolutionProps } from '.'

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
        onClick={() => setShowLicenseModal(true)}
      >
        <EditorTooltip text={solutionStrings.changeLicense} />
        <FaIcon icon={faCreativeCommons} />
      </button>
      <EditorModal
        isOpen={showLicenseModal}
        setIsOpen={setShowLicenseModal}
        className="top-8 max-w-xl translate-y-0 sm:top-24"
        title={solutionStrings.changeLicense}
        extraTitleClassName="serlo-h3 mt-4"
      >
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
                <option className="bg-brand-200 text-brand" key={id} value={id}>
                  {id} {title}
                </option>
              )
            })}
          </select>
        </div>
      </EditorModal>
    </>
  )
}
