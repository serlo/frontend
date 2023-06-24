import { faTable } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

import { TableProps } from '.'
import { useTableConfig } from './config'
import { FaIcon } from '@/components/fa-icon'

const TableContainer = styled.div({
  overflowX: 'auto',
  '& tr': {
    borderTop: '1px solid #c6cbd1',
  },
  '& th, & td': {
    padding: '6px 13px',
    border: '1px 1px solid #dfe2e5',
  },
  '& table tr:nth-child(2n)': {
    background: '#f6f8fa',
  },
  '& table': {
    width: '100%',
    maxWidth: '100%',
  },
})

export function TableRenderer(props: TableProps) {
  const { editable, state } = props
  const config = useTableConfig(props.config)

  return (
    <TableContainer>
      {editable && state.value.trim() === '' ? (
        <FaIcon icon={faTable} className="mr-[5px]" />
      ) : null}
      <config.MarkdownRenderer markdown={state.value} />
    </TableContainer>
  )
}
