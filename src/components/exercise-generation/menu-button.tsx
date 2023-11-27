import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import * as Select from '@radix-ui/react-select'
import React, { ForwardedRef, ReactNode, forwardRef, useState } from 'react'

import { FaIcon } from '@/components/fa-icon'

interface MenuButtonProps {
  children: ReactNode
  onChange: (value: string) => void
  value: string
  defaultValue?: string
}

export function MenuButton({
  children,
  onChange,
  defaultValue,
  value,
}: MenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Select.Root
      onValueChange={(value: string) => onChange(value)}
      defaultValue={defaultValue}
      onOpenChange={(open: boolean) => setIsOpen(open)}
      value={value}
    >
      <Select.Trigger className="serlo-button-blue ml-4 mr-4 rounded-md border bg-brand-700 p-2 px-4 text-center text-center text-white focus:outline-brand-700">
        <Select.Value placeholder="Select an option" />
        <Select.Icon className="ml-2 text-white">
          <FaIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content
        className="rounded-md border border-brand-300 bg-white"
        side="bottom"
        position="popper"
      >
        <Select.Viewport>{children}</Select.Viewport>
      </Select.Content>
    </Select.Root>
  )
}

interface MenuItemProps {
  children: ReactNode
  value: string
  isSelected?: boolean
}

function _MenuItem(
  { children, value }: MenuItemProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <Select.Item
      value={value}
      className="mx-2 my-0.5 border border-transparent p-1 text-center hover:rounded-lg hover:border hover:border-brand-700 hover:bg-brand-700 hover:text-white"
      ref={ref}
    >
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  )
}

export const MenuItem = forwardRef(_MenuItem)
