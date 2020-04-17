import { Element, Node, Path } from 'slate'

export function getNextElementPath(editor, p, block = true) {
  let path = p.slice(0)
  let node = Node.get(editor, path)
  while (
    path.length > 0 &&
    (!Element.isElement(node) || editor.isInline(node) === block)
  ) {
    path = Path.parent(path)
    node = Node.get(editor, path)
  }
  return path
}
