import styled from 'styled-components'

import { TableProps } from '.'
import { TableRenderer } from './renderer'
import { EditorTextarea } from '../../../editor-ui'

const Form = styled.form({
  marginTop: '10px',
})

export function TableEditor(props: TableProps) {
  const { focused, state } = props

  return (
    <div>
      {focused ? (
        <Form>
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
        </Form>
      ) : (
        <TableRenderer {...props} />
      )}
    </div>
  )
}
