import { hasOwnPropertyTs } from './has-own-property-ts'
import { FrontendContentNode } from '@/data-types'

export function hasVisibleContent(content: FrontendContentNode[]): boolean {
  const text = extractText(content)
  return text.trim().length > 0
}

function extractText(content: FrontendContentNode[]): string {
  return content
    .map((node) => {
      if (node.type == 'math') return node.formula
      if (hasOwnPropertyTs(node, 'text')) {
        return node.text
      } else {
        return extractText(node.children ?? [])
      }
    })
    .join('')
}
