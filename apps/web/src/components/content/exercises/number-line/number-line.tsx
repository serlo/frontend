import { Dispatch, SetStateAction } from 'react'

import { NumberLineSteps } from './number-line-steps'
import { cn } from '@/helper/cn'

interface NumberLineProps {
  maxValue: number // highest value of number line
  labeledValue: number
  selectedValue: number
  searchedValue: number
  setSelectedValue: Dispatch<SetStateAction<number>>
  isChecked?: boolean
  isCorrect?: boolean
}

const stepAmount = 40

export function NumberLine({
  maxValue,
  labeledValue,
  isChecked,
  selectedValue,
  setSelectedValue,
  searchedValue,
  isCorrect,
}: NumberLineProps) {
  const step = maxValue / 40

  return (
    <div className="relative mb-12">
      <input
        id="number-line"
        type="range"
        value={selectedValue}
        onChange={({ currentTarget }) =>
          setSelectedValue(parseInt(currentTarget.value))
        }
        disabled={isChecked}
        min={0}
        max={maxValue}
        step={step}
        className={cn(
          'z-20 h-20 w-full cursor-pointer appearance-none',
          'overflow-visible rounded-md p-4 outline-dotted outline-2 outline-transparent focus-visible:outline-brand-400',
          '[&::-webkit-slider-thumb]:opacity-0',
          '[&::-moz-range-thumb]:opacity-0'
        )}
      />
      <div className="pointer-events-none absolute -bottom-5 w-full px-4">
        <NumberLineSteps
          stepAmount={stepAmount}
          selectedStep={selectedValue / step}
          searchedStep={searchedValue / step}
          isCorrect={isCorrect}
          isChecked={isChecked}
        />
        {renderLabels()}
      </div>
    </div>
  )

  function renderLabels() {
    return (
      <div className="relative flex items-center justify-between pb-6 text-xs">
        {Array.from({ length: 5 }).map((_, i) => {
          const value = step * i * 10
          const showLabel = isChecked
            ? true
            : 0 === value
              ? true
              : labeledValue === value

          return (
            <div
              key={i}
              className="relative text-center text-base text-gray-700"
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
