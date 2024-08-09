import { PluginSelectionMenuContext } from '@editor/core/contexts/plugins-context'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { useContext } from 'react'

interface AddRowButtonLargeProps {
  insertPluginCallback: (pluginType: string, insertIndex?: number) => void
  insertIndex: number
}

export function AddRowButtonLarge({
  insertIndex,
  insertPluginCallback,
}: AddRowButtonLargeProps) {
  const rowsStrings = useEditorStrings().plugins.rows
  const pContext = useContext(PluginSelectionMenuContext)

  return (
    <button
      className="serlo-button-editor-secondary mx-auto mt-24 block"
      onClick={() => {
        pContext.openSuggestions(insertPluginCallback, insertIndex)
      }}
      data-qa="add-new-plugin-row-button"
    >
      <FaIcon icon={faCirclePlus} className="text-xl" />{' '}
      <span className="text-almost-black">{rowsStrings.addAnElement}</span>
    </button>
  )
}
