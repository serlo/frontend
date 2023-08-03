import { TableProps } from '.'
import { TableRenderer } from './renderer'
import { EditorTextarea } from '../../../editor-ui'

export function TableEditor(props: TableProps) {
  const { domFocusWithin, state } = props

  return (
    <div>
      {domFocusWithin ? (
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
