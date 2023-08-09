import { faTable } from '@fortawesome/free-solid-svg-icons'

import type { TableProps } from '.'
import { useTableConfig } from './config'
import { FaIcon } from '@/components/fa-icon'

export function TableRenderer(props: TableProps) {
  const { editable, state } = props
  const config = useTableConfig(props.config)

  return (
    <div className="[&_td]:border [&_td]:border-gray-600">
      {editable && state.value.trim() === '' ? (
        <FaIcon icon={faTable} className="mr-[5px]" />
      ) : null}
      <config.MarkdownRenderer markdown={state.value} />
    </div>
  )
}
