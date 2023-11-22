import { faImages, faParagraph } from '@fortawesome/free-solid-svg-icons'
import { FaIcon, useEditorStrings } from '@serlo/serlo-editor'

import { ChildStateType } from '@/serlo-editor/plugin/child'
import {
  selectDocument,
  selectIsFocused,
  useAppSelector,
} from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'
import { StateTypesReturnType } from '@/serlo-editor/types/internal__plugin-state'

interface CellSwitchButtonProps {
  cell: StateTypesReturnType<{
    content: ChildStateType<string, unknown>
  }>
  isHead: boolean
  isClear: boolean
}

export function CellSwitchButton({
  cell,
  isHead,
  isClear,
}: CellSwitchButtonProps) {
  const tableStrings = useEditorStrings().plugins.serloTable

  const isFocused = useAppSelector((state) =>
    selectIsFocused(state, cell.content.id)
  )
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
      className="serlo-button-editor-secondary absolute -mt-5 ml-3.5 block px-1 pb-0.25 pt-[3px] text-sm"
      title={isImage ? tableStrings.convertToText : tableStrings.convertToImage}
    >
      <FaIcon icon={isImage ? faParagraph : faImages} />
    </button>
  )
}
