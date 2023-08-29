import type { ChildTreeNode } from '../documents'
import { findChildTreeNodeParentById } from '../documents/helpers'

export function findNextChildTreeNode(
  root: ChildTreeNode,
  from: string
): string | null {
  const parent = findChildTreeNodeParentById(root, from)
  if (!parent || parent.id === from) return null
  const { children } = parent
  if (!children) return null

  const index = children.findIndex((child) => child.id === from)

  // Has sibling
  if (index + 1 < children.length) {
    // Go deep to find a child state type node
    let current = children[index + 1]
    while (current.children && current.children.length > 0) {
      current = current.children[0]
    }
    return current.id
  }

  // No siblings. Need to find next node of parent
  return findNextChildTreeNode(root, parent.id)
}

export function findPreviousChildTreeNode(
  root: ChildTreeNode,
  from: string
): string | null {
  const parent = findChildTreeNodeParentById(root, from)
  if (!parent || parent.id === from) return null
  const { children } = parent
  if (!children) return null

  const index = children.findIndex((child) => child.id === from)
  // Has sibling
  if (index >= 1) {
    // Go deep to find a child state type node
    let current = children[index - 1]
    while (current.children && current.children.length > 0) {
      current = current.children[current.children.length - 1]
    }
    return current.id
  }

  // No siblings. Need to find previous node of parent
  return findPreviousChildTreeNode(root, parent.id)
}
