import { isTableType } from './is-table-type'
import { TableType } from '../types'

export function getTableType(text: string): TableType {
  return isTableType(text) ? text : TableType.OnlyColumnHeader
}
