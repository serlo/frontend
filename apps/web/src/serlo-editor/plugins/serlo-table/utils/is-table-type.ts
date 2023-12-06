import { TableType } from '../renderer'

export function isTableType(text: string): text is TableType {
  return Object.values<string>(TableType).includes(text)
}
