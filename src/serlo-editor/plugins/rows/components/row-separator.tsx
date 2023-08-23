import clsx from 'clsx'

import { AddRowButton } from './add-row-button'

interface RowSeparatorProps {
  isFirst?: boolean
  isLast?: boolean
  visuallyEmphasizeAddButton?: boolean
  focused?: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export function RowSeparator({
  isFirst,
  isLast = false,
  visuallyEmphasizeAddButton = false,
  focused,
  onClick,
}: RowSeparatorProps) {
  return (
    <div
      className={clsx(
        'absolute z-[1] h-auto w-full',
        isFirst ? 'top-0' : 'bottom-0',
        isFirst && isLast
          ? ''
          : isFirst
          ? '-translate-y-full'
          : isLast
          ? 'translate-y-[170%]'
          : 'translate-y-full'
      )}
    >
      <AddRowButton
        focused={focused || false}
        onClick={onClick}
        visuallyEmphasized={visuallyEmphasizeAddButton}
      />
    </div>
  )
}
