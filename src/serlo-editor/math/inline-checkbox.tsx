import clsx from 'clsx'

import { tw } from '@/helper/tw'

export interface InlineCheckboxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
}

export function InlineCheckbox({
  checked,
  onChange,
  label,
}: InlineCheckboxProps) {
  return (
    <label className="mx-2.5 my-1.5 inline-block align-middle text-white">
      <span className="mr-2.5 align-middle">{label}</span>
      <div
        className={clsx(
          'inline-block h-5 w-5 cursor-pointer rounded-[15%] border-2 border-white align-middle',
          checked ? 'bg-white' : 'bg-almost-black'
        )}
        onMouseDown={(e) => {
          // avoid loosing focus
          e.stopPropagation()
        }}
        onClick={() => {
          if (onChange) onChange(!checked)
        }}
      >
        <div
          className={clsx(
            tw`
            bold absolute z-[1000] h-2.5 w-5 -rotate-45 rounded-sm border-2
            border-r-0 border-t-0 border-almost-black content-[_]
          `,
            checked ? 'opacity-100' : 'opacity-0'
          )}
        />
      </div>
    </label>
  )
}
