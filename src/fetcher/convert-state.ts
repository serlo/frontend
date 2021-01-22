import { render } from '../../external/legacy_render'
import { FrontendContentNode } from '@/data-types'
import { convert } from '@/schema/convert-edtr-io-state'
import { convertLegacyState } from '@/schema/convert-legacy-state'

export function convertState(raw: string | undefined): FrontendContentNode[] {
  if (!raw) return []

  if (raw?.startsWith('[')) {
    // legacy
    const legacyHTML = render(raw)
    return convertLegacyState(legacyHTML).children
  } else if (raw?.startsWith('{')) {
    // edtrio
    return convert(JSON.parse(raw))
  } else {
    // raw as text
    return [{ type: 'p', children: [{ type: 'text', text: raw ?? '' }] }]
  }
}
