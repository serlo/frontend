import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import React, { useState, useEffect } from 'react'

import { FaIcon } from '@/components/fa-icon'

interface LicenseDropdownProps {
  defaultLicense?: string
  onLicenseChange?: (license: string) => void
  isPixabayImage?: boolean
}

const licenses = [
  'CC BY-SA 4.0',
  'CC BY-SA 3.0',
  'CC BY-SA 2.0',
  'CC BY',
  'Public Domain',
  'CC0',
  'Pixabay Lizenz',
]

export const LicenseDropdown: React.FC<LicenseDropdownProps> = ({
  defaultLicense = 'CC BY-SA 4.0',
  onLicenseChange,
  isPixabayImage = false,
}) => {
  const [selectedLicense, setSelectedLicense] = useState(defaultLicense)
  const [isConfirmed, setIsConfirmed] = useState(false)

  useEffect(() => {
    if (isPixabayImage) {
      setSelectedLicense('Pixabay Lizenz')
      onLicenseChange && onLicenseChange('Pixabay Lizenz')

      setIsConfirmed(true)
    }
  }, [isPixabayImage, onLicenseChange])

  const handleLicenseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLicense(event.target.value)
    onLicenseChange && onLicenseChange(event.target.value)
    setIsConfirmed(true)
  }

  return (
    <label className="mx-auto mb-0 mt-5 flex items-center justify-between text-almost-black">
      <span className="serlo-tooltip-trigger w-1/5">
        Lizenz
        <FaIcon className="ml-2" icon={faQuestionCircle} />
        <EditorTooltip text="info" />
      </span>

      <div className="flex w-3/4 ">
        <select
          value={selectedLicense}
          onChange={handleLicenseChange}
          className="serlo-input-font-reset rounded-md
          border-2 border-editor-primary-100
          bg-editor-primary-100 focus:border-editor-primary focus:outline-none"
        >
          {licenses.map((license) => (
            <option key={license} value={license}>
              {license}
            </option>
          ))}
        </select>
        {isConfirmed && (
          <span className="pointer-events-none ml-2 inline flex items-center pr-3 text-green-500">
            &#10003;
          </span>
        )}
      </div>
    </label>
  )
}
