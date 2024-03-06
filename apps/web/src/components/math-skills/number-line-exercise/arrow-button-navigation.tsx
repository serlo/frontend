import { Dispatch, SetStateAction } from 'react'

import { cn } from '@/helper/cn'

export function ArrowButtonNavigation({
  maxValue,
  selectedValue,
  setSelectedValue,
  active,
}: {
  maxValue: number
  selectedValue: number
  setSelectedValue: Dispatch<SetStateAction<number>>
  active: boolean
}) {
  return (
    <nav className="text-center sm:min-w-180">
      {renderButton(
        'I<',
        'Position mehrere Schritte nach links verschieben',
        () => changeValueToNextFifthStep('down'),
        selectedValue <= 1
      )}
      {renderButton(
        '<',
        'Position einen Schritt nach links verschieben',
        () => changeValueBySteps(-1),
        selectedValue <= 1
      )}
      {renderButton(
        '>',
        'Position einen Schritt nach rechts verschieben',
        () => changeValueBySteps(1),
        selectedValue > maxValue - 1
      )}
      {renderButton(
        '>I',
        'Position mehrerer Schritte nach rechts verschieben',
        () => changeValueToNextFifthStep('up'),
        selectedValue > maxValue - 1
      )}
    </nav>
  )

  function renderButton(
    label: string,
    text: string,
    onClick: () => void,
    isDisabled: boolean
  ) {
    const disabled = isDisabled || !active
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={cn(
          'serlo-button-light me-2 h-10 w-10 bg-orange-100 text-gray-500 opacity-80 hover:bg-orange-200 hover:text-black',
          disabled && 'cursor-default !bg-gray-100 !text-gray-500 opacity-50'
        )}
      >
        {label}
        <span className="sr-only">{text}</span>
      </button>
    )
  }

  function changeValue(value: number) {
    const limitedValue = value < 0 ? 0 : value > maxValue ? maxValue : value
    setSelectedValue(limitedValue)
  }

  function changeValueBySteps(steps: number) {
    const step = maxValue / 40
    changeValue(selectedValue + steps * step)
  }

  function changeValueToNextFifthStep(direction: 'up' | 'down') {
    const bigStep = maxValue / 8
    const nextStep =
      direction === 'up'
        ? Math.floor(selectedValue / bigStep) + 1
        : Math.ceil(selectedValue / bigStep) - 1
    changeValue(nextStep * bigStep)
  }
}
