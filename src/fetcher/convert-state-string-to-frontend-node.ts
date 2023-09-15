import { FrontendContentNode } from '@/frontend-node-types'
import { ConvertNode, convert } from '@/schema/convert-edtr-io-state'

export function convertStateStringToFrontendNode(
  raw?: string
): FrontendContentNode[] {
  if (!raw || !raw.startsWith('{')) return []

  // serlo editor state
  return convert(JSON.parse(raw) as ConvertNode)
}
