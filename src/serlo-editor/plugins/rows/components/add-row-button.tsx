import clsx from 'clsx'

import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'
import { EdtrIcon, edtrPlus } from '@/serlo-editor/editor-ui'

interface AddRowButtonProps {
  focused: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
  visuallyEmphasized?: boolean
}

export function AddRowButton({
  focused,
  onClick,
  visuallyEmphasized = false,
}: AddRowButtonProps) {
  const rowsStrings = useEditorStrings().plugins.rows

  return (
    <button
      className={clsx(
        tw`
        add-trigger z-[70] flex h-7 max-w-full items-center
        justify-center gap-1.5 rounded-full bg-white
        pt-1.5 pb-2.5 text-gray-600 transition-colors
        hover:cursor-pointer hover:text-editor-primary hover:opacity-100
        `,
        visuallyEmphasized ? 'opacity-60' : focused ? 'opacity-60' : 'opacity-0'
      )}
      title={rowsStrings.addAnElement}
      onMouseDown={onClick}
    >
      <EdtrIcon icon={edtrPlus} className="w-[26px]" />
      {visuallyEmphasized ? (
        <span className="text-almost-black">{rowsStrings.addAnElement}</span>
      ) : null}
    </button>
  )
}
