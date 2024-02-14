import {
  BlanksTableRenderer,
  BlanksTableRendererProps,
} from '@editor/plugins/blanks-table/renderer'
import { type BlanksMode, TableType } from '@editor/plugins/blanks-table/types'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorBlanksTableDocument } from '@editor/types/editor-plugins'

export function BlanksTableStaticRenderer({
  state,
  onEvaluate,
}: EditorBlanksTableDocument & {
  onEvaluate?: BlanksTableRendererProps['onEvaluate']
}) {
  const { rows, tableType, mode, extraDraggableAnswers } = state
  if (!rows || rows.length === 0) return null

  const rowsData = rows.map((row, rowIndex) => {
    return {
      cells: (row.columns?.map(({ content }, colIndex) => {
        return content ? (
          <div key={`${rowIndex}:${colIndex}`}>
            <StaticRenderer document={content} />
          </div>
        ) : null
      }) as JSX.Element[]) ?? <></>,
    }
  })

  return (
    <div className="overflow-x-auto">
      <BlanksTableRenderer
        rows={rowsData}
        tableType={tableType as TableType}
        // TODO: Should not be hard-coded
        tableState={rows}
        mode={mode as BlanksMode}
        initialTextInBlank="empty"
        extraDraggableAnswers={extraDraggableAnswers}
        onEvaluate={onEvaluate}
      />
    </div>
  )
}
