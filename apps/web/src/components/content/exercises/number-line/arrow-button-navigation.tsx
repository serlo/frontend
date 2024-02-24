import { Dispatch, SetStateAction } from 'react'

import { cn } from '@/helper/cn'

export function ArrowButtonNavigation({
  maxValue,
  selectedValue,
  setSelectedValue,
}: {
  maxValue: number
  selectedValue: number
  setSelectedValue: Dispatch<SetStateAction<number>>
}) {
  return (
    <nav className="min-w-180">
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
    return (
      <button
        disabled={isDisabled}
        onClick={onClick}
        className={cn(
          'serlo-button-light me-2 h-10 w-10',
          isDisabled && 'cursor-not-allowed opacity-50'
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
