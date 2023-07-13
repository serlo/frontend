import { FrontendContentNode, FrontendNodeType } from '@/frontend-node-types'

export function hasVisibleContent(content: FrontendContentNode[]): boolean {
  const text = extractText(content)
  return text.trim().length > 0
}

export function extractText(content: FrontendContentNode[]): string {
  return content
    .map((node) => {
      if (node.type === FrontendNodeType.Image && node.src) return '[img]'
      if (
        node.type === FrontendNodeType.Math ||
        node.type === FrontendNodeType.InlineMath
      )
        return node.formula
      if (Object.hasOwn(node, 'text')) {
        return node.text
      } else {
        return extractText(node.children ?? [])
      }
    })
    .join('')
}
