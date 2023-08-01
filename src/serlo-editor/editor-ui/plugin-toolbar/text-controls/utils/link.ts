import { Editor as SlateEditor, Element, Node, Range, Transforms } from 'slate'

import { selectionHasElement, trimSelection } from './selection'
import type { Link } from '@/serlo-editor/plugins/text'

function matchLinks(node: Node) {
  return Element.isElement(node) && node.type === 'a'
}

export function isLinkActive(editor: SlateEditor) {
  return selectionHasElement((e) => e.type === 'a', editor)
}

export function getLinkElement(editor: SlateEditor): Link | undefined {
  const [match] = Array.from(SlateEditor.nodes(editor, { match: matchLinks }))
  return match && (match[0] as Link)
}

export function toggleLink(editor: SlateEditor) {
  if (isLinkActive(editor)) {
    Transforms.unwrapNodes(editor, { match: matchLinks })
    return
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)

  if (isCollapsed) {
    Transforms.insertNodes(editor, {
      type: 'a',
      href: '',
      children: [{ text: ' ' }],
    })
    return
  }

  trimSelection(editor)
  Transforms.wrapNodes(
    editor,
    {
      type: 'a',
      href: '',
      children: [],
    },
    { split: true }
  )
  Transforms.collapse(editor, { edge: 'end' })
}
