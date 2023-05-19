import { State } from '../types'
import { selectFocusTree } from './selectors'
import type { Node } from './types'

export function handleFocus(
  focusState: State['focus'],
  state: State,
  findNode: typeof findNextNode
) {
  const from = focusState
  if (!from) return focusState
  const root = selectFocusTree(state)
  if (!root) return focusState
  const next = findNode(root, from)
  if (!next) return focusState
  return next
}

export function findNextNode(root: Node, from: string): string | null {
  const parent = findParent(root, from)
  if (!parent || parent.id === from) return null
  const { children } = parent
  if (!children) return null

  const index = children.findIndex((child) => child.id === from)

  // Has sibling
  if (index + 1 < children.length) {
    // Go deep
    let current = children[index + 1]
    while (current.children && current.children.length > 0) {
      current = current.children[0]
    }
    return current.id
  }

  // No siblings. Need to find next node of parent
  return findNextNode(root, parent.id)
}

export function findPreviousNode(root: Node, from: string): string | null {
  const parent = findParent(root, from)
  if (!parent || parent.id === from) return null
  const { children } = parent
  if (!children) return null

  const index = children.findIndex((child) => child.id === from)
  // Has sibling
  if (index >= 1) {
    // Go deep
    let current = children[index - 1]
    while (current.children && current.children.length > 0) {
      current = current.children[current.children.length - 1]
    }
    return current.id
  }

  // No siblings. Need to find previous node of parent
  return findPreviousNode(root, parent.id)
}

export function findParent(root: Node, id: string): Node | null {
  if (root.id === id) {
    return root
  }

  const children = root.children || []
  for (let i = 0; i < children.length; i++) {
    const resolved = findParent(children[i], id)

    if (resolved) {
      if (resolved.id === id) {
        return root
      }
      return resolved
    }
  }

  return null
}
