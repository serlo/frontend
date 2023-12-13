import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

interface AddRowButtonLargeProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export function AddRowButtonLarge({ onClick }: AddRowButtonLargeProps) {
  const rowsStrings = useEditorStrings().plugins.rows

  return (
    <button
      className="serlo-button-editor-secondary mx-auto mt-24 block"
      onClick={onClick}
      data-qa="add-new-plugin-row-button"
    >
      <FaIcon icon={faCirclePlus} className="text-xl" />{' '}
      <span className="text-almost-black">{rowsStrings.addAnElement}</span>
    </button>
  )
}
