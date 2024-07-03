import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import * as Select from '@radix-ui/react-select'
import React, { useState, useEffect, useRef } from 'react'

import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { cn } from '@/helper/cn'

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
  const { licences, licenceHelpText } = imageStrings

  const licenceNames = Object.values(licences)

  const [selectedLicense, setSelectedLicense] = useState(
    currentLicence ?? 'CC4'
  )
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [triggerWidth, setTriggerWidth] = useState(0)

  const triggerRef = useRef<HTMLLabelElement>(null)

  const isPixabayImage = src?.includes('pixabay')
  useEffect(() => {
    if (isPixabayImage) {
      const pixabayLicence =
        licenceNames.find((name) => name.toLowerCase().includes('pixabay')) ||
        ''
      setSelectedLicense(pixabayLicence)
      onLicenseChange?.(pixabayLicence)
      setIsConfirmed(true)
    }
  }, [isPixabayImage, onLicenseChange, licenceNames])

  useEffect(() => {
    setTriggerWidth(triggerRef.current ? triggerRef.current.offsetWidth / 3 : 0)
  }, [])

  const handleLicenseChange = (newLicence: string) => {
    setSelectedLicense(newLicence)
    onLicenseChange?.(newLicence)
    setIsConfirmed(true)
  }

  return (
    <label
      ref={triggerRef}
      className="mx-auto mb-0 mt-5 flex items-center text-almost-black"
    >
      <span className="serlo-tooltip-trigger w-1/4">
        {imageStrings.licence}
        <FaIcon className="ml-2" icon={faQuestionCircle} />
        <EditorTooltip text={licenceHelpText} />
      </span>
      <span className="flex w-3/4 flex-row border-2 border-transparent">
        <Select.Root
          onValueChange={handleLicenseChange}
          defaultValue={selectedLicense}
          onOpenChange={setIsOpen}
          value={selectedLicense}
        >
          <Select.Trigger
            className={cn(
              'serlo-input-font-reset rounded-md border-2 border-editor-primary-100 bg-editor-primary-100 px-2 text-left focus:border-2 focus:border-editor-primary',
              'flex flex-row justify-between',
              isOpen &&
                'rounded-b-none border-editor-primary-300 border-b-transparent'
            )}
            style={{ width: `${triggerWidth}px` }}
          >
            <Select.Value placeholder="Select an option" />
            <Select.Icon className="ml-2 text-almost-black">
              <FaIcon icon={isOpen ? faCaretUp : faCaretDown} />
            </Select.Icon>
          </Select.Trigger>
          <Select.Content
            className="w-full rounded-md rounded-t-none border-2 border-t-0 border-editor-primary bg-white"
            style={{ width: `${triggerWidth}px` }}
            side="bottom"
            sideOffset={0}
            position="popper"
          >
            {Object.entries(licences).map(([licenseId, licenceName]) => (
              <Select.Item
                key={licenceName}
                value={licenseId}
                className="serlo-input-font-reset my-0 px-3 hover:bg-editor-primary-100"
              >
                <Select.ItemText>{licenceName}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
        {isConfirmed && (
          <span className="pointer-events-none ml-2 inline flex items-center pr-3 text-green-500">
            &#10003;
          </span>
        )}
      </span>
    </label>
  )
}
