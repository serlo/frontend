import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import * as Select from '@radix-ui/react-select'
import React, { useState, useEffect, useRef } from 'react'

import { FaIcon } from '@/components/fa-icon'
import { cn } from '@/helper/cn'

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
  const [isOpen, setIsOpen] = useState(false)

  const [triggerWidth, setTriggerWidth] = useState(0)

  useEffect(() => {
    if (isPixabayImage) {
      setSelectedLicense('Pixabay Lizenz')
      onLicenseChange && onLicenseChange('Pixabay Lizenz')

      setIsConfirmed(true)
    }
  }, [isPixabayImage, onLicenseChange])

  const handleLicenseChange = (newLicence: string) => {
    setSelectedLicense(newLicence)
    onLicenseChange && onLicenseChange(newLicence)
    setIsConfirmed(true)
  }

  const triggerRef = useRef<HTMLLabelElement>(null)

  // hack to get the content to be the same width as the trigger
  useEffect(() => {
    setTriggerWidth(triggerRef.current ? triggerRef.current.offsetWidth / 2 : 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerRef.current])

  return (
    <label
      ref={triggerRef}
      className="mx-auto mb-0 mt-5 flex items-center text-almost-black"
    >
      <span className="serlo-tooltip-trigger w-1/4">
        Lizenz
        <FaIcon className="ml-2" icon={faQuestionCircle} />
        <EditorTooltip text="info" />
      </span>
      <span className="flex w-3/4 flex-row border-2 border-transparent">
        <Select.Root
          onValueChange={(value: string) => handleLicenseChange(value)}
          defaultValue={selectedLicense}
          onOpenChange={(open: boolean) => setIsOpen(open)}
          value={selectedLicense}
        >
          <Select.Trigger
            className={cn(
              `serlo-input-font-reset  rounded-md 
           border-2 border-editor-primary-100
           bg-editor-primary-100 px-2 focus:border-2 focus:border-editor-primary`,
              isOpen && 'rounded-b-none',
              isOpen && 'border-editor-primary-300',
              isOpen && 'mb-[-1] border-b-0'
            )}
            style={{
              width: triggerWidth + 'px',
            }}
          >
            <Select.Value placeholder="Select an option" />
            <Select.Icon className="ml-2 text-almost-black">
              <FaIcon icon={isOpen ? faCaretUp : faCaretDown} />
            </Select.Icon>
          </Select.Trigger>
          <Select.Content
            className="mr-[-1px] mt-[-1px] w-full rounded-md rounded-t-none border border-2 border-t-0 border-editor-primary bg-white"
            style={{
              width: triggerWidth + 'px',
            }}
            side="bottom"
            sideOffset={0}
            position="popper"
          >
            {licenses.map((license) => (
              <Select.Item
                key={license}
                value={license}
                className=" serlo-input-font-reset my-0 px-3 hover:bg-editor-primary-100"
              >
                <Select.ItemText>{license}</Select.ItemText>
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
