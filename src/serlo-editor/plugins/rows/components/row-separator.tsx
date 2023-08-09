import clsx from 'clsx'

import { AddRowButton } from './add-row-button'
import type { RowsPluginConfig } from '..'

interface RowSeparatorProps {
  config: RowsPluginConfig
  isFirst?: boolean
  isLast?: boolean
  visuallyEmphasizeAddButton?: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
  focused?: boolean
}

export function RowSeparator({
  isFirst,
  isLast = false,
  visuallyEmphasizeAddButton = false,
  onClick,
  focused,
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
