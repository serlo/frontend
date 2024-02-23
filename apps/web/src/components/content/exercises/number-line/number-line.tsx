import { Dispatch, SetStateAction } from 'react'

import { NumberLineSteps } from './number-line-steps'
import { cn } from '@/helper/cn'

interface NumberLineProps {
  maxValue: number // highest value of number line
  labeledValue: number
  selectedValue: number
  setSelectedValue: Dispatch<SetStateAction<number>>
  searchedValue: number
  showAllLabels?: boolean
}

const stepAmount = 40

export function NumberLine({
  maxValue,
  labeledValue,
  showAllLabels,
  selectedValue,
  setSelectedValue,
  searchedValue,
}: NumberLineProps) {
  const step = maxValue / 40

  return (
    <div className="relative mb-12">
      <label className="block pb-4 text-xl font-bold" htmlFor="number-line">
        Wo ist die {searchedValue}?
      </label>
      <input
        id="number-line"
        type="range"
        value={selectedValue}
        onChange={({ currentTarget }) =>
          setSelectedValue(parseInt(currentTarget.value))
        }
        min={0}
        max={maxValue}
        step={step}
        className={cn(
          'z-20 h-16 w-full cursor-pointer appearance-none',
          'overflow-visible rounded-md p-4 outline-dotted outline-2 outline-transparent focus-visible:outline-brand-400',
          '[&::-webkit-slider-thumb]:appearance-none',
          '[&::-webkit-slider-thumb]:w-[3px]',
          '[&::-webkit-slider-thumb]:h-20',
          '[&::-webkit-slider-thumb]:bg-red-600',
          '[&::-moz-range-thumb]:appearance-none',
          '[&::-moz-range-thumb]:w-[3px]',
          '[&::-moz-range-thumb]:h-20',
          '[&::-moz-range-thumb]:bg-red-600',
          '[&::-moz-range-thumb]:border-none'
        )}
      />
      <div className="pointer-events-none absolute -bottom-5 w-full px-4">
        <NumberLineSteps stepAmount={stepAmount} />
        {renderLabels()}
      </div>
    </div>
  )

  function renderLabels() {
    return (
      <div className="relative flex items-center justify-between pb-6 text-xs">
        {Array.from({ length: 5 }).map((_, i) => {
          const value = step * i * 10
          const showLabel = showAllLabels
            ? true
            : 0 === value
              ? true
              : labeledValue === value

          return (
            <div
              key={i}
              className="relative text-center text-base text-gray-500"
            >
              {showLabel ? (
                <b className="absolute -ml-40 w-80">{value}</b>
              ) : null}
            </div>
          )
        })}
      </div>
    )
  }
}
