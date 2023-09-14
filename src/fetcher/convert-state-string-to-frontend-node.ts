import { FrontendContentNode, FrontendNodeType } from '@/frontend-node-types'
import { ConvertNode, convert } from '@/schema/convert-edtr-io-state'

export function convertStateStringToFrontendNode(
  raw?: string
): FrontendContentNode[] {
  if (!raw) return []

  // serlo editor state
  if (raw?.startsWith('{')) {
    return convert(JSON.parse(raw) as ConvertNode)
  }

  // TODO: where is this used?
  // raw as text
  // eslint-disable-next-line no-console
  console.log(raw)
  return [
    {
      type: FrontendNodeType.P,
      children: [{ type: FrontendNodeType.Text, text: raw ?? '' }],
    },
  ]
}
