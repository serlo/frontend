import { render } from '../../external/legacy_render'
import { FrontendContentNode, FrontendNodeType } from '@/frontend-node-types'
import { convert } from '@/schema/convert-edtr-io-state'
import { convertLegacyState } from '@/schema/convert-legacy-state'

export function convertState(raw: string | undefined): FrontendContentNode[] {
  if (!raw) return []

  if (raw?.startsWith('[')) {
    // Legacy editor state
    const legacyHTML = render(raw)
    return convertLegacyState(legacyHTML).children
  } else if (raw?.startsWith('{')) {
    // Serlo Editor state
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return convert(JSON.parse(raw))
  } else {
    // raw as text
    return [
      {
        type: FrontendNodeType.P,
        children: [{ type: FrontendNodeType.Text, text: raw ?? '' }],
      },
    ]
  }
}
