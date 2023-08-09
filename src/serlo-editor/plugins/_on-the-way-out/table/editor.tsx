import type { TableProps } from '.'
import { TableRenderer } from './renderer'
import { EditorTextarea } from '../../../editor-ui'

export function TableEditor(props: TableProps) {
  const { focused, state } = props

  return (
    <div>
      {focused ? (
        <form className="mt-2.5">
          <div>
            <EditorTextarea
              value={state.value}
              placeholder="Enter the table using Markdown syntax"
              name="markdown"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                state.set(e.target.value)
              }}
              ref={props.autofocusRef}
            >
              {state.value}
            </EditorTextarea>
            <TableRenderer {...props} />
          </div>
        </form>
      ) : (
        <TableRenderer {...props} />
      )}
    </div>
  )
}
