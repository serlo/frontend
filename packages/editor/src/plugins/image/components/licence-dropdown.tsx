import { NiceDropdown } from '@editor/core/components/nice-dropdown'
import { useState, useEffect, useRef, FC } from 'react'

import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface LicenseDropdownProps {
  onLicenseChange?: (license: string) => void
  src?: string
  currentLicence?: string
}

const imageLicenses = [
  { id: 1, label: 'CC BY-SA 4.0' },
  { id: 2, label: 'CC BY-SA 3.0' },
  { id: 3, label: 'CC BY-SA 2.0' },
  { id: 4, label: 'CC BY' },
  { id: 5, label: 'CCO' },
  { id: 6, label: 'Pixabay License' },
  { id: 7, label: 'Public Domain' },
]

export const LicenseDropdown: FC<LicenseDropdownProps> = ({
  onLicenseChange,
  src,
  currentLicence,
}) => {
  const editorStrings = useEditorStrings()
  const { licence, licenceHelpText } = editorStrings.plugins.image

  const [isConfirmed, setIsConfirmed] = useState(
    src ? src.includes('pixabay') : false
  )
  const [selectedLicense, setSelectedLicense] = useState(currentLicence || '1')
  const isPixabayImage = src?.includes('pixabay')
  const hasSetInitialLicense = useRef(false)

  useEffect(() => {
    if (isPixabayImage && !hasSetInitialLicense.current) {
      const pixabayLicense = imageLicenses.find(({ id }) => id === 6)
      if (!pixabayLicense) return
      setSelectedLicense(pixabayLicense.id.toString())
      onLicenseChange?.(pixabayLicense.id.toString())
      setIsConfirmed(true)
      hasSetInitialLicense.current = true
    }
  }, [isPixabayImage, onLicenseChange])

  const handleLicenseChange = (newLicense?: string) => {
    if (newLicense) {
      setSelectedLicense(newLicense)
      onLicenseChange?.(newLicense)
      setIsConfirmed(true)
    }
  }

  return (
    <NiceDropdown
      options={imageLicenses.map(({ id, label }) => ({
        label: label ?? '',
        value: id,
      }))}
      onChange={handleLicenseChange}
      label={licence}
      helpText={licenceHelpText}
      defaultValue={selectedLicense}
      isConfirmed={isConfirmed}
    />
  )
}
