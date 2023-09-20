import { ChangeEvent, ReactNode } from 'react'

interface MenuButtonProps extends React.HTMLProps<HTMLSelectElement> {
  children: ReactNode

  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <select
      {...props}
      className="ml-2 rounded-md border border-lightblue bg-brand-100 p-2 text-center text-brand-700 focus:border-lightblue focus:outline-brand-700"
    >
      {children}
    </select>
  )
}

interface MenuItemProps extends React.HTMLProps<HTMLOptionElement> {
  isSelected?: boolean
}

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  isSelected,
  ...props
}) => {
  return (
    <option
      {...props}
      className={`${isSelected ? 'bg-brand-700 text-white' : 'text-brand-700'}`}
    >
      {children}
    </option>
  )
}
