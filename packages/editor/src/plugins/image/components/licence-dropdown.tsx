import { NiceDropdown } from '@editor/core/components/nice-dropdown'
import { useState, FC } from 'react'

import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface LicenseDropdownProps {
  onLicenseChange?: (license: string) => void
  src?: string
  currentLicence?: string
}

enum ImageLicence {
  'CCBYSA4' = 'CC BY-SA 4.0',
  'CCBYSA3' = 'CC BY-SA 3.0',
  'CCBYSA2' = 'CC BY-SA 2.0',
  'CCBY' = 'CC BY',
  'CCO' = 'CCO',
  'Pixabay' = 'Pixabay License',
  'PublicDomain' = 'Public Domain',
}

export const LicenseDropdown: FC<LicenseDropdownProps> = ({
  onLicenseChange,
  src,
  currentLicence,
}) => {
  const editorStrings = useEditorStrings()
  const { licence, licenceHelpText } = editorStrings.plugins.image

  const [isConfirmed, setIsConfirmed] = useState(!!src?.includes('pixabay'))
  const [selectedLicense, setSelectedLicense] = useState(currentLicence || '1')

  const handleLicenseChange = (newLicense?: string) => {
    if (newLicense) {
      setSelectedLicense(newLicense)
      onLicenseChange?.(newLicense)
      setIsConfirmed(true)
    }
  }

  return (
    <NiceDropdown
      options={Object.keys(ImageLicence).map((key) => ({
        label: ImageLicence[key as keyof typeof ImageLicence],
        value: key,
      }))}
      onChange={handleLicenseChange}
      label={licence}
      helpText={licenceHelpText}
      defaultValue={selectedLicense}
      isConfirmed={isConfirmed}
      showConfirmation
    />
  )
}
