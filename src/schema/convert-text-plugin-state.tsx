import type { NewElement, NewNode, NewText } from '@edtr-io/plugin-text'

import { sanitizeLatex } from './sanitize-latex'
import type {
  FrontendContentNode,
  FrontendLiNode,
  FrontendTextColor,
} from '@/data-types'

const colors: FrontendTextColor[] = ['blue', 'green', 'orange']

export function isSlateBlock(node: NewNode): node is NewElement {
  return (node as NewElement).type !== undefined
}

export function isTextNode(node: NewNode): node is NewText {
  return (node as NewText).text !== undefined
}

export function convertTextPluginState(
  node: NewNode[] | NewNode | undefined
): FrontendContentNode[] {
  if (!node || Object.keys(node).length === 0) return []
  if (Array.isArray(node)) return node.flatMap(convertTextPluginState)
  if (isSlateBlock(node)) return convertSlateBlock(node)
  if (isTextNode(node)) return convertTextNode(node)
  return []
}

export function convertSlateBlock(node: NewElement): FrontendContentNode[] {
  if (node.type === 'p') {
    return [
      { type: 'slate-p', children: convertTextPluginState(node.children) },
    ]
  }
  if (node.type === 'a') {
    const children = convertTextPluginState(node.children)
    if (!node.href) {
      // remove empty links
      return children
    }
    return [
      {
        type: 'a',
        href: node.href,
        children,
      },
    ]
  }
  if (node.type === 'h') {
    if (
      node.level === 1 ||
      node.level === 2 ||
      node.level === 3 ||
      node.level === 4 ||
      node.level === 5
    ) {
      return [
        {
          type: 'h',
          level: node.level,
          children: convertTextPluginState(node.children),
        },
      ]
    } else {
      return [
        {
          type: 'h',
          level: 5,
          children: convertTextPluginState(node.children),
        },
      ]
    }
  }
  if (node.type === 'math' && !node.inline) {
    if (!node.src) {
      return []
    }
    return [
      {
        type: 'math',
        formula: sanitizeLatex(node.src),
        formulaSource: node.src,
        alignCenter: true,
      },
    ]
  }
  if (node.type === 'math' && node.inline) {
    if (!node.src) {
      return []
    }
    return [
      {
        type: 'inline-math',
        formula: sanitizeLatex(node.src),
        formulaSource: node.src,
      },
    ]
  }
  if (node.type === 'unordered-list') {
    // only allow li nodes
    const children = convertTextPluginState(node.children).filter(
      (child) => child.type === 'li'
    ) as FrontendLiNode[]

    return [
      {
        type: 'ul',
        children,
      },
    ]
  }
  if (node.type === 'ordered-list') {
    // only allow li nodes
    const children = convertTextPluginState(node.children).filter(
      (child) => child.type === 'li'
    ) as FrontendLiNode[]

    return [
      {
        type: 'ol',
        children,
      },
    ]
  }
  if (node.type === 'list-item') {
    const children: FrontendContentNode[] = [
      { type: 'p', children: convertTextPluginState(node.children) },
    ]

    return [
      {
        type: 'li',
        children,
      },
    ]
  }
  if (node.type === 'list-item-child') {
    return convertTextPluginState(node.children)
  }
  return []
}

export function convertTextNode(node: NewText): FrontendContentNode[] {
  const text = node.text.replace(/\ufeff/g, '')
  if (text === '') return []
  return [
    {
      type: 'text',
      text,
      em: node.em,
      strong: node.strong,
      color: colors[node.color as number],
      code: node.code,
    },
  ]
}
