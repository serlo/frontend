import { NiceDropdown } from '@editor/core/components/nice-dropdown'
import { useState, useEffect } from 'react'

import { useInstanceData } from '@/contexts/instance-context'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface LicenseDropdownProps {
  onLicenseChange?: (license: string) => void
  src?: string
  currentLicence?: string
}

export const LicenseDropdown = ({
  onLicenseChange,
  src,
  currentLicence,
}: LicenseDropdownProps) => {
  const editorStrings = useEditorStrings()
  const imageStrings = editorStrings.plugins.image
  const { licenses: allLicenses } = useInstanceData()

  const relevantLicenseIds = [1, 2, 3, 101, 102, 103, 104]
  const licenses = allLicenses.filter(
    (license) => license.shortTitle && relevantLicenseIds.includes(license.id)
  )
  const licenceNames = licenses.map((license) => {
    return license.shortTitle
  })

  const [isConfirmed, setIsConfirmed] = useState(false)

  const isPixabayImage = src?.includes('pixabay')
  useEffect(() => {
    if (isPixabayImage) {
      const pixabayLicence =
        licenceNames.find((name) => name?.toLowerCase().includes('pixabay')) ||
        ''
      onLicenseChange?.(pixabayLicence)
      setIsConfirmed(true)
    }
  }, [isPixabayImage, onLicenseChange, licenceNames])

  const handleLicenseChange = (newLicence: string) => {
    onLicenseChange?.(newLicence)
    setIsConfirmed(true)
  }

  return (
    <NiceDropdown
      options={licenses.map((license) => ({
        label: license.shortTitle ?? '',
        value: license.id,
      }))}
      onChange={(newLicence: string) => handleLicenseChange(newLicence)}
      label={imageStrings.licence}
      helpText={imageStrings.licenceHelpText}
      defaultValue={currentLicence}
      isConfirmed={isConfirmed}
    />
  )
}
