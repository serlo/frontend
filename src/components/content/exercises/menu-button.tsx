import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import * as Select from '@radix-ui/react-select'
import React, { MutableRefObject, ReactNode, forwardRef, useState } from 'react'

import { FaIcon } from '@/components/fa-icon'

interface MenuButtonProps {
  children: ReactNode
  onChange: (value: string) => void
  value: string
  defaultValue?: string
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  children,
  onChange,
  defaultValue,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Select.Root
      onValueChange={(value: string) => onChange(value)}
      defaultValue={defaultValue}
      onOpenChange={(open: boolean) => setIsOpen(open)}
      value={value}
    >
      <Select.Trigger className="ml-4 mr-4 rounded-md border bg-brand-700 p-2 px-4 text-center text-center text-white focus:outline-brand-700">
        <Select.Value placeholder="Select an option" />
        <Select.Icon className="ml-2 text-white">
          <FaIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </Select.Icon>
      </Select.Trigger>
      {/* Portal would be rendered underneath the modal but I don't think it's needed */}
      {/* <Select.Portal className="z-50"> */}
      <Select.Content
        className="rounded-md border border-sky-200 bg-white"
        side="bottom"
        // align="end"
        position="popper"
      >
        <Select.Viewport>{children}</Select.Viewport>
      </Select.Content>
      {/* </Select.Portal> */}
    </Select.Root>
  )
}

interface MenuItemProps {
  children: ReactNode
  value: string
  isSelected?: boolean
}

export const MenuItem: React.FC<MenuItemProps> = forwardRef(
  ({ children, value }, ref) => {
    return (
      <Select.Item
        value={value}
        className="mx-2 my-0.5 border border-transparent p-1 text-center hover:rounded-lg hover:border hover:border-brand-700 hover:bg-brand-700  hover:text-white"
        ref={ref as MutableRefObject<HTMLDivElement>}
      >
        <Select.ItemText>{children}</Select.ItemText>
        {/* <Select.ItemIndicator className="text-brand-700"></Select.ItemIndicator> */}
      </Select.Item>
    )
  }
)

MenuItem.displayName = 'MenuItem'
