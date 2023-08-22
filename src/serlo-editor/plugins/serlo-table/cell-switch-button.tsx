import { faImages, faParagraph } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { ChildStateType } from '@/serlo-editor/plugin/child'
import { selectDocument, useAppSelector } from '@/serlo-editor/store'
import { StateTypesReturnType } from '@/serlo-editor/types/internal__plugin-state'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

interface CellSwitchButtonProps {
  cell: StateTypesReturnType<{
    content: ChildStateType<string, unknown>
  }>
  isHead: boolean
  isClear: boolean
  isFocused: boolean
}

export function CellSwitchButton({
  cell,
  isHead,
  isClear,
  isFocused,
}: CellSwitchButtonProps) {
  const tableStrings = useEditorStrings().plugins.serloTable

  const document = useAppSelector((state) =>
    selectDocument(state, cell.content.id)
  )

  if (!document || isHead || !isFocused || !isClear) return null

  const isImage = document.plugin === EditorPluginType.Image

  return (
    <button
      onMouseDown={(e) => e.stopPropagation()} // hack to stop editor from stealing events
      onClick={() => {
        cell.content.replace(
          isImage ? EditorPluginType.Text : EditorPluginType.Image
        )
      }}
      className="serlo-button-light absolute m-2 block py-0.5 text-sm"
      title={isImage ? tableStrings.convertToText : tableStrings.convertToImage}
    >
      <FaIcon icon={isImage ? faParagraph : faImages} />
    </button>
  )
}
