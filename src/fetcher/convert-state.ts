import { FrontendContentNode, FrontendNodeType } from '@/frontend-node-types'
import { ConvertNode, convert } from '@/schema/convert-edtr-io-state'

export function convertState(raw: string | undefined): FrontendContentNode[] {
  if (!raw) return []

  // hide unsupported legacy editor state
  if (raw.startsWith('[')) return []

  // serlo editor state
  if (raw.startsWith('{')) return convert(JSON.parse(raw) as ConvertNode)

  // raw as text
  return [
    {
      type: FrontendNodeType.P,
      children: [{ type: FrontendNodeType.Text, text: raw }],
    },
  ]
}
