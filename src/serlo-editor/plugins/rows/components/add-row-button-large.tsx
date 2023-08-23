import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface AddRowButtonLargeProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export function AddRowButtonLarge({ onClick }: AddRowButtonLargeProps) {
  const rowsStrings = useEditorStrings().plugins.rows

  return (
    <div className="absolute mx-side -mt-12">
      <button
        className="serlo-button-editor-secondary"
        data-qa="add-new-plugin-row-button"
        onClick={onClick}
      >
        <FaIcon icon={faCirclePlus} className="text-xl" />{' '}
        <span className="text-almost-black">{rowsStrings.addAnElement}</span>
      </button>
    </div>
  )
}
