import { Element, Editor, Location } from 'slate'

export function existsInAncestors(
  predicate: (element: Element) => boolean,
  { location }: { location: Location },
  editor: Editor
) {
  const matchingNodes = Array.from(
    Editor.nodes(editor, {
      at: location,
      match: (node) =>
        !Editor.isEditor(node) && Element.isElement(node) && predicate(node),
    })
  )

  return matchingNodes.length !== 0
}
