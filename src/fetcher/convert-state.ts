import { render } from '../../external/legacy_render'
import { FrontendContentNode, FrontendNodeType } from '@/frontend-node-types'
import { triggerSentry } from '@/helper/trigger-sentry'
import { ConvertNode, convert } from '@/schema/convert-edtr-io-state'
import { convertLegacyState } from '@/schema/convert-legacy-state'

export function convertState(raw: string | undefined): FrontendContentNode[] {
  if (!raw) return []

  // legacy editor state
  if (raw?.startsWith('[')) {
    const message = 'using legacy format'
    // eslint-disable-next-line no-console
    console.error(message)
    // eslint-disable-next-line no-console
    console.log(raw)
    triggerSentry({ message })
    const legacyHTML = render(raw)
    return convertLegacyState(legacyHTML).children
  }

  // serlo editor state
  if (raw?.startsWith('{')) {
    return convert(JSON.parse(raw) as ConvertNode)
  }

  // raw as text
  return [
    {
      type: FrontendNodeType.P,
      children: [{ type: FrontendNodeType.Text, text: raw ?? '' }],
    },
  ]
}
