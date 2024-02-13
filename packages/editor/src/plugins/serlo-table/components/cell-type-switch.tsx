import { ChildStateType } from '@editor/plugin/child'
import { selectDocument, selectIsFocused, useAppSelector } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { StateTypesReturnType } from '@editor/types/internal__plugin-state'
import { faImages, faParagraph, faPen } from '@fortawesome/free-solid-svg-icons'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

import { CellTypeSwitchButton } from './cell-type-switch-button'
import { useAreImagesDisabledInTable } from '../contexts/are-images-disabled-in-table-context'

interface CellTypeSwitchProps {
  cell: StateTypesReturnType<{
    content: ChildStateType<string, unknown>
  }>
  isHead: boolean
  isClear: boolean
  allowImageInTableCells: boolean
}

export function CellTypeSwitch(props: CellTypeSwitchProps) {
  const { cell, isHead, isClear, allowImageInTableCells } = props

  const tableStrings = useEditorStrings().plugins.serloTable

  const areImagesDisabled = useAreImagesDisabledInTable()

  const isFocused = useAppSelector((state) =>
    selectIsFocused(state, cell.content.id)
  )
  const document = useAppSelector((state) =>
    selectDocument(state, cell.content.id)
  )

  if (!document || isHead || !isFocused || !isClear) return null

  return (
    <div className="absolute -mt-5 flex">
      {document.plugin === EditorPluginType.Text ? null : (
        <CellTypeSwitchButton
          title={tableStrings.convertToText}
          icon={faParagraph}
          onClick={() => {
            cell.content.replace(EditorPluginType.Text)
          }}
        />
      )}
      {document.plugin === EditorPluginType.Image ||
      !allowImageInTableCells ||
      areImagesDisabled ? null : (
        <CellTypeSwitchButton
          title={tableStrings.convertToImage}
          icon={faImages}
          onClick={() => {
            cell.content.replace(EditorPluginType.Image)
          }}
        />
      )}
      {document.plugin === EditorPluginType.FillInTheBlanksExercise ? null : (
        <CellTypeSwitchButton
          title={tableStrings.convertToBlank}
          icon={faPen}
          onClick={() => {
            cell.content.replace(EditorPluginType.FillInTheBlanksExercise)
          }}
        />
      )}
    </div>
  )
}
