import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useEditorStrings } from '@editor/utils/use-editor-strings'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

interface AddRowButtonLargeProps {
  onClick: () => void
}

export function AddRowButtonLarge({ onClick }: AddRowButtonLargeProps) {
  const rowsStrings = useEditorStrings().plugins.rows

  return (
    <button
      className="serlo-button-editor-secondary mx-auto mt-24 flex items-center rounded-lg px-5 py-2.5 text-xl"
      onClick={onClick}
      data-qa="add-new-plugin-row-button"
    >
      <FaIcon icon={faCirclePlus} className="mr-3 text-3xl" />
      <span className="text-almost-black">{rowsStrings.addAnElement}</span>
    </button>
  )
}
