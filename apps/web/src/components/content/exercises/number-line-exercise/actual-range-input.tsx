import { ChangeEvent, Dispatch, SetStateAction } from 'react'

import { cn } from '@/helper/cn'

interface NumberLineProps {
  maxValue: number
  selectedValue: number
  searchedValue: number
  setSelectedValue: Dispatch<SetStateAction<number>>
  disabled?: boolean
}

export function ActualRangeInput({
  maxValue,
  disabled,
  selectedValue,
  setSelectedValue,
}: NumberLineProps) {
  const step = maxValue / 40

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setSelectedValue(parseInt(e.currentTarget.value))
  }

  return (
    <input
      className={cn(
        `z-20 h-[120px] w-full cursor-ew-resize appearance-none rounded-md
        p-4 outline-dotted outline-2 outline-transparent focus-visible:outline-brand-400
        [&::-moz-range-thumb]:opacity-0 [&::-webkit-slider-thumb]:opacity-0`
      )}
      id="number-line"
      type="range"
      value={selectedValue}
      onChange={onChange}
      disabled={disabled}
      min={0}
      max={maxValue}
      step={step}
    />
  )
}
