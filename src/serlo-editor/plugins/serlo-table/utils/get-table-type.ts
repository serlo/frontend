import { isTableType } from './is-table-type'
import { TableType } from '../renderer'

export function getTableType(text: string): TableType {
  return isTableType(text) ? text : TableType.OnlyColumnHeader
}
