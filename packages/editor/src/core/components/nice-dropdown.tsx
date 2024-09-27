import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import * as Select from '@radix-ui/react-select'
import { useEffect, useRef, useState } from 'react'

interface NiceDropdownProps {
  label: string
  helpText: string
  onChange?: (val: string) => void
  options: { label: string; value: string | number }[]
  defaultValue?: string
  className?: string
  isConfirmed?: boolean
  showConfirmation?: boolean
}

export const NiceDropdown = ({
  label,
  helpText,
  onChange,
  defaultValue,
  options,
  className,
  isConfirmed: initialConfirmed,
  showConfirmation,
}: NiceDropdownProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue)
  const [isOpen, setIsOpen] = useState(false)
  const [triggerWidth, setTriggerWidth] = useState(0)
  const [isConfirmed, setIsConfirmed] = useState(initialConfirmed ?? false)
  const [hasOpened, setHasOpened] = useState(false)

  const triggerRef = useRef<HTMLButtonElement>(null)

  const handleChange = (newValue: string) => {
    setSelectedValue(newValue)
    onChange?.(newValue)
    setIsConfirmed(true)
  }

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth)
    }
  }, [])

  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true)
    } else if (!isOpen && hasOpened) {
      setIsConfirmed(true)
    }
  }, [isOpen, hasOpened])

  // Update selectedValue if defaultValue changes
  useEffect(() => {
    setSelectedValue(defaultValue)
  }, [defaultValue])

  return (
    <label
      className={cn(
        'h-100 mx-auto mb-0 mt-5 flex items-center text-almost-black',
        className
      )}
    >
      <span className="serlo-tooltip-trigger flex w-1/4 justify-between pr-[15px]">
        {label}
        <FaIcon className="ml-2" icon={faQuestionCircle} />
        <EditorTooltip text={helpText} />
      </span>
      <span className="flex w-1/2 flex-row border-2 border-transparent">
        <Select.Root
          onValueChange={handleChange}
          defaultValue={defaultValue}
          onOpenChange={setIsOpen}
          value={selectedValue}
        >
          <Select.Trigger
            ref={triggerRef}
            onKeyDown={(e) => e.stopPropagation()}
            className={cn(
              'serlo-input-font-reset rounded-md border-2 bg-editor-primary-100 px-2 text-left focus:border-2 focus:border-editor-primary',
              'flex w-full flex-row justify-between',
              isOpen
                ? 'rounded-b-none border-b-0 border-editor-primary'
                : 'border-editor-primary-100'
            )}
            style={{ height: '1.75em' }}
          >
            <Select.Value />
            <Select.Icon className="ml-2 text-almost-black">
              <FaIcon icon={isOpen ? faCaretUp : faCaretDown} />
            </Select.Icon>
          </Select.Trigger>
          <Select.Content
            className="mx-auto mt-[-2px] rounded-md rounded-t-none border-2 border-editor-primary bg-white"
            side="bottom"
            position="popper"
            onKeyDown={(e) => e.stopPropagation()}
            style={{ width: triggerWidth, borderTop: 'none' }}
          >
            <Select.Viewport>
              {options.map(({ label, value }) => (
                <Select.Item
                  key={value.toString()}
                  value={value.toString()}
                  className="my-0 px-3 hover:bg-editor-primary-100 focus:bg-editor-primary-100"
                >
                  <Select.ItemText>{label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Root>
      </span>
      {showConfirmation && isConfirmed && (
        <span className="pointer-events-none ml-2 inline-flex items-center pr-3 text-green-500">
          ✓
        </span>
      )}
    </label>
  )
}
