import { AddRowButtonFloating } from './add-row-button-floating'
import { AddRowButtonLarge } from './add-row-button-large'

interface RowSeparatorProps {
  visuallyEmphasizeAddButton?: boolean
  focused?: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export function RowSeparator({
  visuallyEmphasizeAddButton = false,
  focused,
  onClick,
}: RowSeparatorProps) {
  return (
    <div className="absolute bottom-0 z-[1] h-auto w-full translate-y-full">
      {visuallyEmphasizeAddButton ? (
        <AddRowButtonLarge onClick={onClick} />
      ) : (
        <AddRowButtonFloating focused={focused || false} onClick={onClick} />
      )}
    </div>
  )
}
