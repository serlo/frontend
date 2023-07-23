import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'

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

  if (visuallyEmphasized)
    return (
      <button
        className="serlo-button-editor-secondary"
        onClick={onClick}
        title={rowsStrings.addAnElement}
      >
        <FaIcon icon={faCirclePlus} className="text-xl" />{' '}
        <span className="text-almost-black">{rowsStrings.addAnElement}</span>
      </button>
    )

  return (
    <div className="group flex justify-center">
      <button
        className={clsx(
          tw`
          add-trigger z-[70] h-7 rounded-full py-2 text-gray-600 transition-all
          hover:cursor-pointer hover:text-editor-primary hover:opacity-100
          group-hover:opacity-60
          `,
          focused ? 'opacity-60' : 'opacity-0'
        )}
        title={rowsStrings.addAnElement}
        onClick={onClick}
      >
        <FaIcon icon={faCirclePlus} className="text-xl" />
      </button>
    </div>
  )
}
